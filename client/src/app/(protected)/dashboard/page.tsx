'use client';
import React, { useState, useEffect } from 'react';
import { Grid } from '../../../types/grid';
import { GridItem } from '../../../types/grid';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import Navbar from '../../../components/Navbar';
import AgGrid from '../../../components/AgGrid';

export default function Profile() {
    const [items, setItems] = useState<GridItem[]>([]);
    const [myWS, setWS] = useState<WebSocket>();
    const [headers, setHeaders] = useState<string[]>([]);
    const [isNewSheet, setIsNewSheet] = useState<boolean>(true);

    const setOfLinkSynonyms = new Set(['url', 'linkedin', 'github', 'portfolio', 'website', 'link', 'links', 'site']) 

    // @pfoster use these functions to set the grid items and headers
    function setGridHeaders(gridHeaders: string[]) {
        setHeaders(gridHeaders);
    }

    // temporary placeholder for grid items and headers
    useEffect(() => {
        setItems([
            { value: 'https://github.com/liaozhuzhu', r: 0, c: 'URL' },
            { value: 'https://www.linkedin.com/in/liao-zhu/', r: 1, c: 'URL' },
            // {"value":"N/A","r":1,"c":"CEO name"},
        ]);
        setGridHeaders(['URL', 'Company name']);

        const ws = new WebSocket('ws://localhost:4500');

        setWS(ws);

        ws.onopen = () => {
          console.log('Connected to the server');
        };

        const griditems : GridItem[] = [];
    
        ws.onmessage = (event) => {
            console.log('Message from server:', event.data);
            const json = JSON.parse(event.data);
            if (!json.type) return;
            if (json.type === 'newItems') {
                for (let item of json.value) {
                    griditems.push(item);
                }
                setItems([...griditems]);
            }
        };
        return () => ws.close();
    }, []);

    const sendDataToServer = () => {
        myWS?.send(JSON.stringify({ type: 'create', rows: 3, headers: ['AI education startups', 'Company name']}));
    }

    function LinkComponent(props: ICellRendererParams) {
        return (
            <a href={props.value} target='_blank' className='underline'>
                {props.value}
            </a>
        );
    }

    // create a column definition for each header
    let colDefs: ColDef[] = headers.map(header => {
        return {
            field: header,
            flex: 1,
            cellRenderer: setOfLinkSynonyms.has(header.toLowerCase()) ? LinkComponent : '',
        }
    });

    let grid: Grid = {
        headers: headers,
        items: items,
    };

    let rowData: any[] = [];
    grid.items.forEach((item: GridItem) => {
        let row = rowData[item.r] || {};
        row[item.c] = item.value;
        rowData[item.r] = row;
    });
    
    return (
        <div className='flex'>
            <Navbar sheets={[{name: 'Sheet 1', id: 0}, {name: 'Sheet 2', id: 1}]} setIsNewSheet={setIsNewSheet}/>
            <div className='flex flex-col h-screen w-full justify-center p-[40px]'>
                <button onClick={sendDataToServer}>Populate</button>
                {
                    isNewSheet ? <div>Hello World</div> : <AgGrid rowData={rowData} colDefs={colDefs}/>
                }
            </div>
        </div>
    )
}
