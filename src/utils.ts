import { blacklistedDomains } from "./blacklists.js";

const resultsPerGooglePage = 100;

function isBlacklisted(url: string) {
  return blacklistedDomains.some((domain) => url.includes(domain));
}

export { resultsPerGooglePage, isBlacklisted };
