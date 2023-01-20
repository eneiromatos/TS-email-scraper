import { CheerioAPI } from "cheerio";
import { RequestQueue } from "crawlee";
import { generateRequest } from "./requestsGenerator.js";
import { isBlacklisted, resultsPerGooglePage } from "./utils.js";

function getResultRequests($: CheerioAPI) {
  const resultsElements = $(".main a[href^='http']").toArray();

  const resultsUrls = resultsElements
    .map((el) => {
      const url = $(el).attr("href");

      if (!url) {
        return "";
      }

      try {
        const newUrl = new URL(url);
        return newUrl.origin;
      } catch {
        return "";
      }
    })
    .filter((url) => url && !isBlacklisted(url))
    .map((url) => generateRequest({ url }));

  return resultsUrls;
}

async function navigateResults($: CheerioAPI) {
  const requestQueue = await RequestQueue.open();
  const requests = getResultRequests($);
  await requestQueue.addRequests(requests);
}

async function navigateNextPage(currentUrl: string) {
  const requestQueue = await RequestQueue.open();

  const navigationUrl = new URL(currentUrl);
  const nextStart =
    Number(navigationUrl.searchParams.get("start")) + resultsPerGooglePage;

  navigationUrl.searchParams.set("start", nextStart.toString());

  const request = generateRequest({ url: navigationUrl.href });
  await requestQueue.addRequest(request);
}

function isLastPage($: CheerioAPI) {
  const results = getResultRequests($);

  if (results.length <= 3) {
    return true;
  }

  return false;
}

export { navigateResults, navigateNextPage, isLastPage };
