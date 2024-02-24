'use client';
import React, { useState, useEffect } from 'react';

export default function NavbarItem({ sheetName }: { sheetName: string }) {
    return (
        <li className='flex justify-center items-center text-white p-2 pl-0 text-md cursor-pointer rounded-md'>
            {sheetName}
        </li>
    )
}
