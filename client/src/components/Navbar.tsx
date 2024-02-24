'use client';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import NavbarItem from './NavbarItem';
import { Sheet } from '../types/sheet';
import UserSettings from './UserSettings'

export default function Navbar({ sheets, setIsNewSheet } : { sheets: Sheet[], setIsNewSheet(isNewSheet: boolean): void }){ // sheet is { name: string, id: number }

    const [userSettingsShowing, setUserSettingsShowing] = useState<boolean>(false); 
    const [userSheets, setUserSheets] = useState<Sheet[]>([]);

    useEffect(() => {
        setUserSheets(sheets);
    }, [sheets]);

    return (
        <div className='flex justify-between bg-brandColor p-2 min-w-[250px]'>
            <div className='flex flex-col justify-start items-center w-full p-3'>
                <div onClick={() => setIsNewSheet(true)} className='text-white text-md cursor-pointer p-2 rounded-md flex items-center justify-start gap-2 text-md w-full mb-16 bg-brandColor hover:bg-brandHoverColor transition'>
                    <p>Create Sheet</p>
                    <FontAwesomeIcon icon={faSquarePlus}/>
                </div>
                <div className="flex justify-center items-center flex-col w-full">
                    <h3 className="w-full text-md text-zinc-500 p-2 pb-0">Your Sheets</h3>
                    <ul className='flex flex-col justify-center items-start text-left w-full'>
                        {userSheets.map((sheet) => (
                            <NavbarItem key={sheet.id} sheetName={sheet.name} handleClick={() => setIsNewSheet(false)}/>
                        ))}
                    </ul>
                </div>
                <div className='relative mt-auto flex justify-start gap-2 items-center text-white text-md cursor-pointer p-2 rounded-md duration-450 z-0 w-full bg-brandColor hover:bg-brandHoverColor transition' onClick={() => setUserSettingsShowing(!userSettingsShowing)}>
                    <img src="https://via.placeholder.com/150" alt="profile" className="rounded-full h-9 w-9"/>
                    <p>User Profile</p>
                    {userSettingsShowing && <UserSettings/>}
                </div>
            </div>
        </div>
    )
}