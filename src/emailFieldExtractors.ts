import { CheerioAPI, load } from "cheerio";
import { blacklistedExtensions } from "./blacklists.js";

type ExtractOptions = { $: CheerioAPI; domainUrl: string; sendRequest: any };

function getContactUrls($: CheerioAPI, domainUrl: string): string[] {
  const contactElements = $("a[href*='contact']").toArray();
  const urls = contactElements.map(
    (el) => new URL(<string>$(el).attr("href"), domainUrl).href
  );
  const uniqueUrls = Array.from(new Set(urls));

  const contactUrls = uniqueUrls.filter((url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  });

  return contactUrls;
}

function getEmailAddresses($: CheerioAPI): string[] {
  const html = String($("*").html());
  let emailsLike = html.match(
    /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,20}/g
  );
  emailsLike = emailsLike ? emailsLike : [];

  const emails = emailsLike.filter(
    (email) =>
      !blacklistedExtensions.some((extension) => email.endsWith(extension))
  );

  return emails;
}

async function extractEmailsFromDomain(extractOptions: ExtractOptions): Promise<string[]> {
  const { $, domainUrl, sendRequest } = extractOptions;

  const contactUrls = getContactUrls($, domainUrl);
  const rawEmails: string[] = [];

  rawEmails.push(...getEmailAddresses($));

  for (const url of contactUrls) {
    const response = await sendRequest({ url });

    if (response.statusCode != 200) {
      continue;
    }

    const _$ = load(response.body, null, true);

    rawEmails.push(...getEmailAddresses(_$));
  }

  const cleanEmails = Array.from(new Set(rawEmails));
  return cleanEmails;
}

export { extractEmailsFromDomain, ExtractOptions };
