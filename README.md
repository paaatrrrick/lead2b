# Intro to Sheetz

Introducing Sheetz: Your Ultimate Data Assistant! Say goodbye to tedious data entry and hello to effortless information gathering. With Sheetz, you can simply request what you need, like a list of 100 edtech startups with their website link, company name, email, and phone number and watch as it automatically populates your sheet. Powered by intelligent web search, Sheetz is your go-to tool for quick, accurate, and up-to-date data collection. Streamline your workflow and unlock new levels of productivity with Sheetz – where data meets convenience!

# Future Roadmap

- Give users the ability to edit the sheet.
- Connect the sheet to a service like Google Sheets or Excel
- Optimize the search algorithm to increase the success rate of filling a cell within the sheet

# Technical Aspect of Sheetz

When the user creates a sheet, they also add columns, which are used as queries to be answered. The Exa API is used to get the best search results. From there, web scraping, BFS, and GPT are used to extract the relevant information to answer all the queries. If the query cannot be answered, then N/A is put in the cell. This process is repeated for each row until the user's specificed amount of rows (and all the cells) are completed.