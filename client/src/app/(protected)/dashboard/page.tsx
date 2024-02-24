'use client';
import React, { useState, useEffect } from 'react';
import { Grid } from '../../../types/grid';
import { GridItem } from '../../../types/grid';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';

export default function Profile() {
    const [items, setItems] = useState<GridItem[]>([]);
    const [headers, setHeaders] = useState<string[]>([]);

    const setOfLinkSynonyms = new Set(['url', 'linkedin', 'github', 'portfolio', 'website', 'link', 'links', 'site']) 

    useEffect(() => {
        setItems([
            { value: 'https://github.com/liaozhuzhu', r: 0, c: 'URL' },
            { value: 'Zhu', r: 0, c: 'feature2' },
            { value: 'https://www.linkedin.com/in/liao-zhu/', r: 1, c: 'URL' },
            { value: 'Life', r: 1, c: 'feature2' },
        ]);
        setHeaders(['URL', 'feature2']);
    }, []);

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
        <div className='flex flex-col'>
            <div className='flex flex-col h-screen w-full justify-center'>
                <div className='ag-theme-quartz' style={{ height: '100%', width: '100%' }}>
                    <AgGridReact
                        rowData={rowData}
                        columnDefs={colDefs}
                    />
                </div>
            </div>
        </div>
    )
}
