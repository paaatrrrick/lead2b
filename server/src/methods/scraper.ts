import axios from 'axios';
import * as cheerio from 'cheerio';

async function getWebsiteHTML(url: string): Promise<string | null> {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    $('script').remove();
    $('style').remove();
    $('link[rel="stylesheet"]').remove();
    $('noscript').remove();
    const textContent = $('body').html();
    // Remove all extra white spaces and trim the text
    // console.log('-----------------------------------');
    // console.log(textContent.replace(/\s+/g, ' ').trim());
    const html : string = textContent.replace(/\s+/g, ' ').trim();
    if (!html || typeof html !== 'string') return "N/A";
    return html;

  } catch (error) {
    return "N/A";
  }
}

export default getWebsiteHTML;


// const webpages = [];
// webpages.push('https://www.freecodecamp.org/news/how-to-scrape-websites-with-node-js-and-cheerio/');
// webpages.push('https://github.com/paaatrrrick/lead2b/pull/1');
// webpages.push('https://futurestud.io/tutorials/remove-all-whitespace-from-a-string-in-javascript');
// for (let i = 0; i < webpages.length; i++) {
//   getWebsiteHTML(webpages[i]).then(console.log);
// }
