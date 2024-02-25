'use client';
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

export default function NavbarItem({ sheetName, handleClick, active }: { sheetName: string, handleClick(): void, active: boolean}) {
    return (
        <li onClick={handleClick} className={clsx(active && 'text-brandColor', !active && 'text-white', 'flex justify-start items-center  p-2 text-md cursor-pointer rounded-md duration-450 z-0 hover:text-brandColor transition ease-in-out w-full')}>
            {sheetName}
        </li>
    )
}
