import {
  CheerioCrawler,
  KeyValueStore,
  ProxyConfiguration,
  RequestQueue,
} from "crawlee";
import { loadDomainUrls, loadKeywords } from "./inputLoaders.js";
import { router } from "./routes.js";

type inputSchema = {
  keywords: string[];
  domainUrls: string[];
};

const requestQueue = await RequestQueue.open();

const { keywords = [], domainUrls = [] } =
  (await KeyValueStore.getInput<inputSchema>())!;

await loadKeywords(keywords);
await loadDomainUrls(domainUrls);

//const proxyConfiguration = new ProxyConfiguration();

const crawler = new CheerioCrawler({
  requestQueue,
  // proxyConfiguration,
  requestHandler: router,
});

await crawler.run();
