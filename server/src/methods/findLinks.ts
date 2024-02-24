import * as cheerio from 'cheerio';

function extractLinksFromHTML(html: string): string[] {
  try {
    const $ = cheerio.load(html);
    const links: string[] = [];

    $('a[href]').each((_, element) => {
      const href = $(element).attr('href');
      if (href && isValidUrl(href)) {
        links.push(href);
      }
    });

    return links;
  } catch (error) {
    console.error('Error extracting links from HTML:', error);
    return [];
  }
}

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
}

export default extractLinksFromHTML;
