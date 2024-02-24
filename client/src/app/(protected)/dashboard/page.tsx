'use client';
import React, { useState, useEffect } from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import Navbar from '../../../components/Navbar';
import AgGrid from '../../../components/Grid';
import NewSheetForm from '../../../components/NewSheetForm';
import { Sheet } from '@/types/sheet';
import { getAuthToken } from '@/helpers/firebase';
import constants from '@/helpers/constants';

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

    return (
        <div className='flex'>
            <Navbar sheets={sheets} setView={setView}/>
            <div className='flex flex-col h-screen w-full justify-center p-[40px]'>
                {
                    (view === "") ? <NewSheetForm setSheets={setSheets} sheets={sheets} setView={setView}/> : <AgGrid id={view}/>
                }
            </div>
        </div>
    )
}
