import { RequestQueue } from "crawlee";
import { generateRequest } from "./requestsGenerator.js";
import { resultsPerGooglePage } from "./utils.js";

async function loadKeywords(keywords: string[]) {
  const requestQueue = await RequestQueue.open();

  const googleSearchUrl = new URL(`https://www.google.com/search`);

  for (const keyword of keywords) {
    googleSearchUrl.searchParams.set("q", keyword);
    googleSearchUrl.searchParams.set("num", resultsPerGooglePage.toString());
    googleSearchUrl.searchParams.set("filter", "0");
    googleSearchUrl.searchParams.set("start", "0");

    const request = generateRequest({ url: googleSearchUrl.href })!;
    await requestQueue.addRequest(request);
  }
}

async function loadDomainUrls(domainUrls: string[]) {
  for (const url of domainUrls) {
    const requestQueue = await RequestQueue.open();
    const request = generateRequest({ url });
    await requestQueue.addRequest(request);
  }
}

export { loadKeywords, loadDomainUrls };
