import Exa from "exa-js"

if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const exa = new Exa(process.env.exa_key);

async function searchForLinks(search : string, num: number) {
    try {
        const searchOptions = {
            numResults: num
        }

        // Perform the search
        const response = await exa.search(search, searchOptions);      
        // Log the search results
        console.log('Search Results:', response.results);
    } catch (error) {
        // Log any errors
        console.error('Search Error:', error);
    }
}

export default searchForLinks;
  