'use client';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
    return (
        <div className='flex justify-between bg-purple-800 p-2 min-w-[250px]'>
            <div className='flex flex-col justify-start items-center w-full p-3'>
                <div className='text-white text-md cursor-pointer px-1 rounded-sm py-2 outline flex items-center justify-between w-full mb-16'>
                    <p>Create Gridsheet</p>
                    <FontAwesomeIcon icon={faSquarePlus} className="text-md"/>
                </div>
                <h3 className="outline w-full">Your Gridsheets</h3>
                <ul className='flex flex-col justify-center items-start text-left text-[15px] w-full'>
                    <li className='text-white'>Top Internships In USA</li>
                </ul>
            </div>
        </div>
    )
}
