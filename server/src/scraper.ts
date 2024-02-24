const axios = require('axios');
const cheerio = require('cheerio');

async function getWebsiteHTML(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    $('script').remove();
    $('style').remove();
    $('link[rel="stylesheet"]').remove();
    const textContent = $('body').text();
    return textContent;
  } catch (error) {
    console.error('Error fetching website HTML:', error);
    return null;
  }
}

const url = 'https://www.freecodecamp.org/news/how-to-scrape-websites-with-node-js-and-cheerio/';
getWebsiteHTML(url)
  .then(html => {
    console.log(html);
  })
  .catch(error => {
    console.error('Error:', error);
  });
