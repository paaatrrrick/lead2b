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
                <div className='text-white text-md cursor-pointer p-2 rounded-md flex items-center justify-between w-full mb-16 bg-brandColor hover:bg-[#6500F0] transition'>
                    <p>Create Gridsheet</p>
                    <FontAwesomeIcon icon={faSquarePlus} className="text-md"/>
                </div>
                <h3 className="w-full text-md text-darkColor">Your Gridsheets</h3>
                <ul className='flex flex-col justify-center items-start text-left text-[15px] w-full'>
                    {userSheets.map((sheet) => (
                        <NavbarItem key={sheet.id} sheetName={sheet.name} />
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Navbar;