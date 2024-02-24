import findValueInText from "./chat";
import searchForLinks from "./exa";
import getWebsiteHTML from "./scraper";
import Sheet from "../models/sheet";

export interface GridItem {
    value: string;
    r: number;
    c: string;
}

interface wsMessage {
    type : string;
    value : GridItem[];
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

const wsWrapper = (ws : any, itemCount : number, id : string) => {

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
                Sheet.findByIdAndUpdate(id, {gridItems: graph}).exec().then((res) => {
                    console.log(res);
                })
            }
        }
    }
}


const createGraph = async (id : string, socket : any) => {
    const sheet = await Sheet.findById(id);
    const { rows, prompt, columns } = sheet;
    const ws = wsWrapper(socket, rows * (columns.length + 1), id);
    const { links, htmls } = await searchAndPrintLinks(prompt, rows);
    const listComprehension : GridItem[] = links.map((link : string, index : number) => { return {value: link, r: index, c: 'URL'}});
    ws({"type": 'newItems', "value": listComprehension});
    // Assuming findValueInText expects a single HTML content and a single query
    for (const k in htmls) {
        const i = parseInt(k);
        const html = htmls[i];
        for (const j in columns) {
            const query = columns[j];
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