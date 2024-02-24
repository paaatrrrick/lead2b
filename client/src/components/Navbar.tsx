'use client';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import NavbarItem from './NavbarItem';
import { Sheet } from '../types/sheet';

interface NavbarProps {
    sheets: Sheet[];
}

const Navbar: React.FC<NavbarProps> = ({ sheets }: NavbarProps) => { // sheet is { name: string, id: number }

    // create a usestate variable called userSheets that's a list of sheets
    const [userSheets, setUserSheets] = useState<Sheet[]>([]);

    useEffect(() => {
        setUserSheets(sheets);
    }, [sheets]);

    return (
        <div className='flex justify-between bg-brandColor p-2 min-w-[250px]'>
            <div className='flex flex-col justify-start items-center w-full p-3'>
                <div className='text-white text-md cursor-pointer p-2 rounded-md flex items-center justify-between w-full mb-16 bg-brandColor hover:bg-brandHoverColor transition'>
                    <p>Create Gridsheet</p>
                    <FontAwesomeIcon icon={faSquarePlus} className="text-md"/>
                </div>
                <div className="flex justify-center items-center pl-2 flex-col w-full">
                    <h3 className="w-full text-md text-darkColor">Your Gridsheets</h3>
                    <ul className='flex flex-col justify-center items-start text-left w-full'>
                        {userSheets.map((sheet) => (
                            <NavbarItem key={sheet.id} sheetName={sheet.name} />
                        ))}
                    </ul>
                </div>
                <div className='mt-auto flex justify-start gap-2 items-center text-white text-md cursor-pointer p-2 rounded-md w-full bg-brandColor hover:bg-brandHoverColor transition'>
                    <img src="https://via.placeholder.com/150" alt="profile" className="rounded-full h-9 w-9"/>
                    <p>User Profile</p>
                </div>
            </div>
        </div>
    )
}

export default Navbar;