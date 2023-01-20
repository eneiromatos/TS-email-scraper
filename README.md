
# TS-email-scraper
Welcome to the TS-email-scraper repository! This software is a data extraction tool capable of mining contact email addresses from websites using Google Search and/or individual domain URLs. This tool was coded in TypeScript and uses Crawlee library on top of Node.js.

## Installation
To install this software, you will need to have Node.js installed on your computer. Once Node.js is installed, you can clone this repository and run `npm install` to install the necessary dependencies. Once that's done, you're ready to start scraping!

## Usage
### Input
To use this software, you will need to provide a JSON input file with your desired keywords and/or domain URLs. The JSON file should have the following schema:

````
{
  "keywords": ["keyword1", "keyword2", ...],
  "domainUrls":["https://www.example1.com", "https://www.example2.com", ...]
}
````

-   `keywords` is an array of keywords. The software will use these keywords to search for websites related to the specific subject you want to scrape emails from.
    
-   `domainUrls` is an array of specific URLs that the software will crawl. These URLs can be a specific website that you want to scrape emails from.

This file needs to be located on this route: `./storage/key_value_stores/default/INPUT.json'` 
    
The input file allows you to specify the keywords and domain URLs you want the software to focus on, making it more targeted and efficient in finding the email addresses you need.
### Output
Once you have your input file ready, you can run the software using the command `npm start`. The software will then begin crawling and extracting email addresses. The output of the software is multiple JSON files that contain the results of the scraping process. The JSON file is structured in the following format:

```
{
	"domainUrl": "https://www.example.com",
	"emails": [
		"email1@example.com",
		"email2@example.com",
		...
	]
}
```

-   `domainUrl` is the URL of the website that was crawled.
    
-   `emails` is an array of email addresses that were extracted from the website.

It will be stored in: `./storage/datasets/default`

The software will output a JSON file per each website crawled.

## Real-life Use Cases

-   A Marketing agency wants to expand its email marketing list by scraping email addresses from relevant websites in the industry, it can use keywords like "marketing agencies" and "email marketing" to scrape emails from different marketing agencies websites.
-   A Recruiting agency wants to gather contact information for potential B2B opportunities in a specific field, such as software developers. It can use keywords like "software developer" and "job opportunities" to scrape emails from software development companies.
-   A small business owner wants to reach out to other local businesses and offer their services. They can use keywords like "local business" and "local services" to scrape emails from local business websites and directories.
-   A job seeker wants to reach out to potential employers, the job seeker can use keywords like "job opportunities" and the specific field of the job he wants to apply for to scrape emails from companies that match his search criteria.

I hope you find this software useful and I would be honored if you fork this repository and collaborate with me to improve it. If you have any suggestions or find any bugs, please don't hesitate to open an issue or submit a pull request. Thanks for using TS-email-scraper!

