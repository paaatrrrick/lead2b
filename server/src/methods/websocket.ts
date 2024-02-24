import { link } from "joi";
import findValueInText from "./chat";
import searchForLinks from "./exa";
import getWebsiteHTML from "./scraper";
import { html } from "cheerio/lib/api/manipulation";

export interface GridItem {
    value: string;
    r: number;
    c: string;
}

async function searchAndPrintLinks(query : string, results : number) {
    const htmls : string[] = [];
    const links : string[] = await searchForLinks(query, results);
    for (let i = 0; i < links.length; i++) {
        try {
            const html = await getWebsiteHTML(links[i]);
            if (html && typeof html === 'string') {
                htmls.push(html);
            } else {
                htmls.push("N/A");
            }
        } catch (error) {
            console.error("Error:", error);
            htmls.push("N/A");
        }        
    }
    return {links, htmls};
}

interface wsMessage {
    type : string;
    value : GridItem[];
}

const wsWrapper = (ws : any, itemCount : number) => {

    const graph : GridItem[] = [];
    console.log(itemCount);

    return (message : wsMessage) => {
        console.log('sending ');
        if (message.type === "newItems") {
            console.log(message);
            graph.push(...message.value);
            ws.send(JSON.stringify(message));
            console.log(graph.length);
            if (graph.length === itemCount) {
                console.log('we are done bitch');
            }
        }
    }
}


const createGraph = async (rows : number, queries : string[], firstHeader : string, socket : any) => {
    const ws = wsWrapper(socket, rows * (queries.length + 1));
    const { links, htmls } = await searchAndPrintLinks(firstHeader, rows);
    const listComprehension : GridItem[] = links.map((link : string, index : number) => { return {value: link, r: index, c: 'URL'}});
    ws({"type": 'newItems', "value": listComprehension});
    console.log(htmls);

    // Assuming findValueInText expects a single HTML content and a single query
    for (const k in htmls) {
        const i = parseInt(k);
        const html = htmls[i];
        for (const j in queries) {
            const query = queries[j];
            if (html === "N/A") {
                ws({"type": 'newItems', "value": [{value: "N/A", r: i, c: query}]});
                continue;
            }
            try {
                console.log('trying to call chat');
                findValueInText(html, query).then((res) => {
                    console.log('we have gotten this back from chatgpt');
                    console.log(res);
                    ws({"type": 'newItems', "value": [{value: res, r: i, c: query}]});
                });
            } catch (error) {
                console.error("Error:", error);
                ws({"type": 'newItems', "value": [{value: "N/A", r: i, c: query}]});
            }
        }
    }
}


export default createGraph;