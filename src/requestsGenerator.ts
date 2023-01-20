import { RequestOptions } from "crawlee";
import { Labels } from "./handlerLabels.js";

function generateRequest(request: RequestOptions) {
  const { url } = request;

  const isSearchUrl = url.includes("google.com/search?q=");

  if (isSearchUrl) {
    request.label = Labels.googleUrl;
    return request;
  }

  if (!isSearchUrl) {
    request.label = Labels.domainUrl;
    return request;
  }

  return request;
}

export { generateRequest };
