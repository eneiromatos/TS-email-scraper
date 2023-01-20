import { createCheerioRouter, Dataset, KeyValueStore } from "crawlee";
import { extractEmails } from "./emailExtractor.js";
import {
  isLastPage,
  navigateNextPage,
  navigateResults,
} from "./googleNavigation.js";
import { Labels } from "./handlerLabels.js";

export const router = createCheerioRouter();

router.addDefaultHandler(async ({ request, log }) => {
  log.info(`URL can't be processed, discarding.`, { URL: request.url });
  const timestamp = Date.now().toString();
  const discardedUrlsStorage = await KeyValueStore.open("discarded-urls");
  await discardedUrlsStorage.setValue(timestamp, {
    discardedUrl: request.url,
  });
});

router.addHandler(Labels.googleUrl, async ({ request, response, $, log }) => {
  log.info("Extracting Domains.", {
    STATUSCODE: response.statusCode,
    URL: request.loadedUrl,
  });

  if (!isLastPage($)) {
    await navigateResults($);
    await navigateNextPage(request.url);
  }

});

router.addHandler(
  Labels.domainUrl,
  async ({ request, $, log, sendRequest }) => {
    log.info("Extracting emails.", { url: request.loadedUrl });

    await extractEmails({ $, sendRequest, domainUrl: request.url });
  }
);
