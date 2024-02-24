import Exa from "exa-js"

const exa = new Exa("f4b2ba96-8f67-4134-9f01-22ed89f7dfd0")

async function searchForLatestTechNews(search : string, num: number) {
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

export default searchForLatestTechNews;
  