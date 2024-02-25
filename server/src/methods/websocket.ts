import findValueInText from "./chat";
import searchForLinks from "./exa";
import getWebsiteHTML from "./scraper";
import { html } from "cheerio/lib/api/manipulation";
import extractLinksFromHTML from "./findLinks";
import * as cheerio from 'cheerio';
import Sheet from "../models/sheet";

export interface GridItem {
    value: string;
    r: number;
    c: string;
}

async function searchAndPrintLinks(query : string, results : number) {
    const htmls : string[] = [];
    const links : string[] = [];
    var freeloadingSpots = results;
    const linksInTest = await searchForLinks(query, Math.floor(results * 1.2));
    var i = 0;
    while (links.length < results) {
        const html = await getWebsiteHTML(linksInTest[i]);
        if (html !== "N/A" || freeloadingSpots > 0) {
            htmls.push(html);
            links.push(linksInTest[i]);
        } else {
            freeloadingSpots -= 1;
        }
        i += 1;
    }
    return {links, htmls};
}

interface wsMessage {
    type : string;
    value : GridItem[];
}

const wsWrapper = (ws : any, itemCount : number, id : string) => {
    const graph : GridItem[] = [];
    return (message : wsMessage) => {
        if (message.type === "newItems") {
            graph.push(...message.value);
            ws.send(JSON.stringify(message));
            // console.log(graph.length);
            if (graph.length === itemCount) {
                Sheet.findByIdAndUpdate(id, {gridItems: graph}).exec()                
            }
        }
    }
}

const createGraph = async (id : string, socket : any) => {
    const sheet = await Sheet.findById(id);
    const { rows, prompt, columns } = sheet;
    const ws = wsWrapper(socket, rows * (columns.length + 1), id);
    const { links } = await searchAndPrintLinks(prompt, rows);
    const listComprehension : GridItem[] = links.map((link : string, index : number) => { return {value: link, r: index, c: 'URL'}});
    ws({"type": 'newItems', "value": listComprehension});

    for (const i in links) {
        for (let column of columns) {
            bfs(links[i], column).then((response) => {
                ws({"type": 'newItems', "value": [{value: response, r: parseInt(i), c: column}]});
            });
        }
    }
}

const bfs = async (link : string, column : string) => {
    const baseUrl = link.split('/')[2];
    var currentLayer = [link];
    const usedUrlSet = new Set();
    usedUrlSet.add(link);
    var nextLayer : string[] = [];
    var depth = 1;
    var visitedCount = 0;

    while (currentLayer.length > 0 && depth <= 2 || visitedCount < 8) {
        const url : string = currentLayer.shift();
        console.log(url);
        const html : string = await getWebsiteHTML(url);
        if (html !== "N/A") {
            const text : string = cheerio.load(html)('body').text();


            const response : string = await findValueInText(text, column);
            if (response !== "N/A") {
                // console.log(response);
                return response;
            }

            //add neighbors to nextLayer
            const nextLinks : string[] = extractLinksFromHTML(html);
            console.log(nextLinks);
            for (const nextLink of nextLinks) {
                if (nextLink.includes(baseUrl) && !usedUrlSet.has(nextLink)) {
                    nextLayer.push(nextLink);
                    usedUrlSet.add(nextLink);
                }
            }
        }

        if (currentLayer.length === 0) {
            currentLayer = nextLayer;
            nextLayer = [];
            depth += 1;
        }
        visitedCount += 1;
    }
    return "N/A";
}


export { createGraph };





// const oldBFS = async (htmls : string[], columns : string[], ws : any, rows : number) => {
//     for (const k in htmls) {
//         const i = parseInt(k);
//         const html = htmls[i];
//         for (const j in columns) {
//             const query = columns[j];
//             // if (html === "N/A") {
//             //     ws({"type": 'newItems', "value": [{value: "N/A", r: i, c: query}]});
//             //     continue;
//             // }
//             try {
//                 console.log('trying to call chat');
//                 var res = await findValueInText(html, query);
//                 console.log('we have gotten this back from chatgpt');
//                 console.log(res);
                
//                 var depth_prime = depth;
//                 console.log(depth_prime);
//                 const linkedLists = extractLinksFromHTML(html);
//                 while (res === "N/A" && depth_prime > 0 && linkedLists.length > 0) {
//                     console.log('we are in the while loop');
//                     console.log(linkedLists);
//                     var link = linkedLists.shift(); // Remove the first link from the list
//                     console.log(link);
//                     var newHtml = await getWebsiteHTML(link);
//                     console.log('trying to call chat ${depth_prime}');
//                     try {
//                         const $ = cheerio.load(newHtml);
//                         newHtml = $('body').text();
//                         const newRes = await findValueInText(newHtml, query);
//                         console.log('we have gotten this back from chatgpt');
//                         // Exit the loop if a non-"N/A" response is found
//                         if (newRes !== "N/A") {
//                             res = newRes;
//                             break;
//                         } else {
//                             const pageLinks = await extractLinksFromHTML(newHtml);
//                             for (const newLink of pageLinks) {
//                                 linkedLists.push(newLink); // Add new links to the end of the list
//                             }
//                         }
//                     } catch (error) {
//                         // continue
//                         console.error("Error:", error);
//                     }
//                     depth_prime -= 1;
//                 }
//                 ws({ "type": 'newItems', "value": [{ value: res, r: i, c: query }] });
//             } catch (error) {
//                 console.error("Error:", error);
//                 ws({"type": 'newItems', "value": [{value: "N/A", r: i, c: query}]});
//             }
//         }
//     }
// }