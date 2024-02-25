'use client';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import NavbarItem from './NavbarItem';
import { Sheet } from '../types/sheet';
import UserSettings from './UserSettings'
import { fireBaseAuth } from "@/helpers/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Loader } from './Loader'; 


export default function Navbar({ sheets, setView, view } : { sheets: Sheet[], setView(view: string): void, view : string }){ // sheet is { name: string, id: number }

    const [userSettingsShowing, setUserSettingsShowing] = useState<boolean>(false); 
    const [userSheets, setUserSheets] = useState<Sheet[]>([]);

    const [profilePicture, setProfilePicture] = useState<string>('');
    const [displayName, setDisplayName] = useState<string>('');
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(fireBaseAuth, (user) => {
            if (user) {
            setProfilePicture(user.photoURL || '');
            setIsAuthenticated(true);
            setDisplayName(user.displayName || 'User Profile');
            } else {
            setIsAuthenticated(false);
            setProfilePicture('');
            }
            setIsLoading(false);
        });
        return () => {unsubscribe();}
    },[])

    useEffect(() => {
        setUserSheets(sheets);
    }, [sheets]);

    return (
        <>
            {isLoading && <Loader />}
            {!isLoading && (
            <div className='flex justify-between bg-[#231b3c] p-2 min-w-[250px] h-screen fixed'>
                <div className='flex flex-col justify-start items-center w-full p-3'>
                    <div onClick={() => setView('')} className='text-md cursor-pointer p-4 border-brandColor text-brandColor border-2 rounded-md flex items-center justify-between gap-2 w-full mb-16 h-12'>
                        <p>Create Sheet</p>
                        <FontAwesomeIcon icon={faSquarePlus}/>
                    </div>
                    <div className="flex justify-center items-center flex-col w-full">
                        {userSheets.length > 0 && <h3 className="w-full text-[12px] text-zinc-400 p-2 pb-2">Your Sheets</h3>}
                        <ul className='flex flex-col justify-center items-start text-left w-full'>
                            {userSheets.map((sheet) => (
                                <NavbarItem key={sheet.id} active={sheet.id === view} sheetName={sheet.name} handleClick={() => setView(sheet.id)}/>
                            ))}
                        </ul>
                    </div>
                    <div className='relative mt-auto flex justify-start gap-2 items-center text-white text-md cursor-pointer p-2 rounded-md duration-450 z-0 w-full hover:bg-brandHoverColor transition ease-in-out' onClick={() => setUserSettingsShowing(!userSettingsShowing)}>
                        <img 
                        className="h-9 w-9 rounded-full"
                        src={profilePicture} 
                        alt="Profile Picture" 
                        />
                        <p>{displayName}</p>
                        {userSettingsShowing && <UserSettings/>}
                    </div>
                </div>
            </div>
            )}
        </  >
    )
}