import Exa from "exa-js"

if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const exa = new Exa(process.env.exa_key);

async function searchForLinks(search : string, num: number) {
    try {
        const searchOptions = {
            numResults: num,
            useAutoprompt: true
        }

        const response = await exa.search(search, searchOptions);      
        // Log the search results
        const results = [];
        console.log('Search Results:', response.results);
        for (let i = 0; i < response.results.length; i++) {
            results.push(response.results[i].url);
        }
        console.log('Results:', results);
        return results;

    } catch (error) {
        console.error('Search Error:', error);
    }
}

export default searchForLinks;
  