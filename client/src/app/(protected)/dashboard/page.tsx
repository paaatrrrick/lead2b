'use client';
import React, { useState, useEffect } from 'react';
import { Grid } from '../../../types/grid';
import { GridItem } from '../../../types/grid';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';

export default function Profile() {
    // usestate variable called items 
    const [items, setItems] = useState<GridItem[]>([]);
    const [headers, setHeaders] = useState<string[]>([]);

    useEffect(() => {
        setItems([
            { value: 'Liao', r: 0, c: 'feature1' },
            { value: 'Zhu', r: 0, c: 'feature2' },
            { value: 'Goodbye', r: 1, c: 'feature1' },
            { value: 'Life', r: 1, c: 'feature2' },
        ]);
        setHeaders(['feature1', 'feature2']);
    }, []);

    // create a column definition for each header
    let colDefs: ColDef[] = headers.map(header => {
        return {
            field: header,
            flex: 1,
        }
    });

    let grid: Grid = {
        headers: headers,
        items: items
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
                <div className='ag-theme-quartz-dark' style={{ height: '100%', width: '100%' }}>
                    <AgGridReact
                        rowData={rowData}
                        columnDefs={colDefs}
                    />
                </div>
            </div>
        </div>
    )
}
