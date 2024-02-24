'use client';
import React, { useState, useEffect } from 'react';

export default function NavbarItem({ sheetName, handleClick }: { sheetName: string, handleClick(): void}) {
    return (
        <li onClick={handleClick} className='flex justify-start items-center text-white p-2 text-md cursor-pointer rounded-md duration-450 z-0 hover:bg-brandHoverColor transition w-full'>
            {sheetName}
        </li>
    )
}
