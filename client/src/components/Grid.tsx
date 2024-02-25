'use client';
import { AgGridReact } from 'ag-grid-react';
import type { Grid } from '@/types/grid';
import { GridItem } from '@/types/grid';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { getAuthToken } from '@/helpers/firebase';
import constants from '@/helpers/constants';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function Grid({ id, name }: { id: string, name : string}) {
    const [items, setItems] = useState<GridItem[]>([]);
    const [headers, setHeaders] = useState<string[]>([]);
    const gridRef = useRef<AgGridReact>(null);

    const setOfLinkSynonyms = new Set(['url', 'linkedin', 'github', 'portfolio', 'website', 'link', 'links', 'site']) 


    const getData = async (ws : any) => {
        const token = await getAuthToken();
        const res = await fetch(`${constants.serverUrl}${constants.endpoints.getSheet}?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`,
            },
        });
        if (!res.ok) return;
        const data = await res.json();
        const { sheetName, rows, prompt, columns, gridItems } = data;
        setHeaders(['URL', ...columns]);
        console.log(data);
        if (gridItems.length > 0) {
            setItems(gridItems);
            return;
        }
        ws.send(JSON.stringify({ type: 'create', id: data._id }));
    }

    // temporary placeholder for grid items and headers
    useEffect(() => {
        const ws = new WebSocket(constants.webSocketUrl);
    
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

        getData(ws);
        return () => ws.close();
    }, [id]);

    // myWS?.send(JSON.stringify({ type: 'create', rows: 3, headers: ['AI education startups', 'Company name']}));

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

    const onBtnExport = useCallback(() => {
        gridRef.current!.api.exportDataAsCsv();
    }, []);

    return (
        <div className={`ag-theme-quartz-dark w-full`}>
            <div className='flex row items-center'>
                <h1 className='text-[36px] font-bold mb-[12px] mt-[12px]'>{name}</h1>
                <button onClick={onBtnExport} className=' ml-4 mt-[8px] transition ease-in-out font-semibold rounded-xl text-white hover:border-brandColor text-[12px] flex justify-center items-center border-[1px] gap-[16px] py-[3px] px-[12px]'>
                    <p className='mb-[1px]'>export</p>
                    <FontAwesomeIcon icon={faArrowRight} color='white' />
                </button>
            </div>
            <p className='text-white ml-1 mb-[32px]'>Each row has been autonomously scrapped from the web based on the query you passed in</p>
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
                ref={gridRef}
                domLayout='autoHeight'
                animateRows
                className='my-4 mb-0'
            />
        </div>
    )
}
