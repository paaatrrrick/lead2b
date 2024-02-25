'use client';
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import constants from '@/helpers/constants';
import { getAuthToken } from '@/helpers/firebase';

export default function NavbarItem({ sheetName, handleClick, active, sheetID, removeSheet }: { sheetName: string, handleClick(): void, active: boolean, sheetID : string, removeSheet(): void}) {
    const [hovering, setHovering] = useState<boolean>(false);
    
    //trim sheet name to 17 characters and add '...' if it is longer
    if (sheetName.length > 22) {
        sheetName = sheetName.slice(0, 22) + '...';
    }

    const deleteSheet = async () => {
        const token = await getAuthToken();
        fetch(`${constants.serverUrl}${constants.endpoints.deleteSheet}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ id: sheetID }),
        });
        removeSheet();
    }

    const isBeingUsed = hovering || active;
    return (
        <div className={clsx(isBeingUsed && 'justify-between', !isBeingUsed && 'justify-start', 'w-full flex row items-center')}>
            <li onClick={handleClick} onMouseEnter={() => {setHovering(true)}} onMouseOut={() => {setHovering(false)}} className={clsx(active && 'text-brandColor', !active && 'text-white', 'flex justify-start items-center  p-2 text-md cursor-pointer rounded-md duration-450 z-0 hover:text-brandColor transition ease-in-out w-full')}>
                {sheetName}
            </li>
            {isBeingUsed && 
            <div onMouseEnter={() => {setHovering(true)}} onMouseOut={() => {setHovering(false)}} 
            className='hover:cursor-pointer'
            onClick={deleteSheet}
            >
                <FontAwesomeIcon icon={faTrash} color='#AB69FF'/>
            </div>}
        </div>
    )
}
