'use client';
import { AgGridReact } from 'ag-grid-react';

export default function AgGrid({ rowData, colDefs }: { rowData: any[], colDefs: any[]}) {
    return (
        <div className='ag-theme-quartz-dark' style={{ height: '100%', width: '100%' }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
            />
        </div>
    )
}
