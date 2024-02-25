'use client';
import React, { useState, useEffect } from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import Navbar from '../../../components/Navbar';
import Grid from '../../../components/Grid';
import NewSheetForm from '../../../components/NewSheetForm';
import { Sheet } from '@/types/sheet';
import { getAuthToken } from '@/helpers/firebase';
import constants from '@/helpers/constants';
import '@/styles/styles.css'


export default function Profile() {
    const [view, setView] = useState<string>('');
    const [sheets, setSheets] = useState<Sheet[]>([]);


    const getSheets = async () => {
        const token = await getAuthToken();
        const res = await fetch(`${constants.serverUrl}${constants.endpoints.getSheetNames}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`,
            },
        });
        if (!res.ok) return;
        const data = await res.json();
        setSheets(data.reverse());
    }

    useEffect(() => {
        getSheets();
    }, []);

    const currentName = sheets.find(sheet => sheet.id === view)?.name || '';

    return (
        <div className='flex bg-[#08050F]'>
            <Navbar sheets={sheets} setView={setView} view={view}/>
            <div className='flex flex-col h-screen w-full justify-start items-center p-[40px] ml-[250px]'>
                {
                    (view === "") ? <NewSheetForm setSheets={setSheets} sheets={sheets} setView={setView}/> : <Grid id={view} name={currentName}/>
                }
            </div>
        </div>
    )
}
