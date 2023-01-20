import { Dataset } from "crawlee";
import { DomainModel } from "./dataModel.js";
import {
  ExtractOptions,
  extractEmailsFromDomain,
} from "./emailFieldExtractors.js";

async function extractEmails(extractOptions: ExtractOptions) {
  const { domainUrl } = extractOptions;

  const domain = new DomainModel();

  domain.domainUrl = domainUrl;
  domain.emails = await extractEmailsFromDomain(extractOptions);

  await Dataset.pushData(domain);
}

export { extractEmails };
