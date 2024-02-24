'use client'
import React, { useState, useEffect, Fragment } from 'react'
import Link from 'next/link'
import { Button } from '@/components/Button'
import logo from '@/images/sheetz.png'
import Image from 'next/image';
import { fireBaseAuth } from '@/helpers/firebase';
import { onAuthStateChanged } from "firebase/auth";
import constants from "@/helpers/constants";
import { signOut } from "firebase/auth";
import { Popover, Transition } from '@headlessui/react'
import clsx from 'clsx'
import '../styles/styles.css'


const pages = [
  { name: 'Home', href: '/' },
]

function MobileNavIcon({ open }: { open: boolean }) {
  return (
    <svg aria-hidden="true" className="h-3.5 w-3.5 overflow-visible stroke-slate-700" fill="none" strokeWidth={2} strokeLinecap="round">
      <path
        d="M0 1H14M0 7H14M0 13H14"
        className={clsx('origin-center transition',
          open && 'scale-90 opacity-0',
        )}
      />
      <path
        d="M2 2L12 12M12 2L2 12"
        className={clsx(
          'origin-center transition',
          !open && 'scale-90 opacity-0',
        )}
      />
    </svg>
  )
}

function MobileNavigation({isAuthenticated}: {isAuthenticated: boolean}) {
  return (
    <Popover>
      <Popover.Button
        className="relative z-10 flex h-8 w-8 items-center justify-center ui-not-focus-visible:outline-none"
        aria-label="Toggle Navigation"
      >
        {({ open }) => <MobileNavIcon open={open} />}
      </Popover.Button>
      <Transition.Root>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Popover.Overlay className="fixed inset-0 bg-slate-300/50" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            as="div"
            className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5"
          >
            {pages.map((page, index) => (
              <Popover.Button as={Link} href={page.href} key={index} className="block w-full p-2">{page.name}</Popover.Button>
            ))}
            <hr className="m-2 border-slate-300/40" />
            {isAuthenticated && <Popover.Button as={Link} href="" onClick={() => {signOut(fireBaseAuth)}}>Logout</Popover.Button>}
            {!isAuthenticated && <Popover.Button as={Link} href="/login">Sign in</Popover.Button>}
          </Popover.Panel>
        </Transition.Child>
      </Transition.Root>
    </Popover>
  )
}

export function Header() {
  const [profilePicture, setProfilePicture] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(fireBaseAuth, (user) => {
            if (user) {
              setProfilePicture(user.photoURL || '');
              setIsAuthenticated(true);
            } else {
              setIsAuthenticated(false);
              setProfilePicture('');
            }
        });
        return () => {unsubscribe();}
    },[])

    const logoClicked = () => {
      if (isAuthenticated) {
        window.location.href = constants.routes.defaultAuthenticatedRoute;
      } else {
        window.location.href = constants.routes.home;
      }
    }

  return (
    <header className="py-10 fixed z-50 top-0 left-0 right-0 b-[auto] blurred-container">
    <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center md:gap-x-12">
            <Link href="/" aria-label="Home" className='flex justify-center items-center gap-2'>
              <Image
                className='h-10 w-auto hover:cursor-pointer'
                alt='asdf'
                src={logo}
                onClick={() => {logoClicked()}}
              />
              <strong className='text-white text-[1.5rem]'>sheetz</strong>
            </Link>
            <div className="hidden md:flex md:gap-x-6">
              {pages.map((page, index) => (
                <Link
                  href={page.href}
                  key={index}
                  className="relative inline-block rounded-lg p-4 text-[1rem] text-zinc-500 transition duration-400 ease-in-out hover:text-zinc-300 glow"
                  style={{ position: "relative" }}
                >
                  {page.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-x-5 md:gap-x-8">
            <div className="hidden md:block">
              {isAuthenticated && <button className="inline-block rounded-lg p-4 transition duration-400 text-[1rem] glow text-zinc-500 transition ease-in-out hover:text-zinc-300" onClick={() => {signOut(fireBaseAuth)}}>Logout</button>}
              {!isAuthenticated && <Link href="/login" className="inline-block rounded-lg p-4 transition duration-400 text-[1rem] glow text-zinc-500 transition ease-in-out hover:text-zinc-300">Log in</Link>}
            </div>
            {(isAuthenticated && profilePicture) && 
            <img 
              className="h-10 w-10 rounded-full hover:cursor-pointer"
              src={profilePicture} 
              alt="Profile Picture" 
              onClick={() => {window.location.href = constants.routes.defaultAuthenticatedRoute}}
            />}
            {!isAuthenticated && <Link href="/signup" className="inline-block rounded-lg p-4 transition duration-400 text-[1rem] glow text-zinc-500 transition ease-in-out hover:text-zinc-300">Sign Up</Link>}
            <div className="-mr-1 md:hidden">
              <MobileNavigation isAuthenticated={isAuthenticated}/>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}