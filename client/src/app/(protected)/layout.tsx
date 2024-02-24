'use client';
import React, { ReactNode, useEffect, useState } from "react";
import { useError } from '@/context/ErrorContext';
import { useLoader } from '@/context/LoaderContext';
import { onAuthStateChanged } from "firebase/auth";
import { fireBaseAuth } from '@/helpers/firebase';
import constants from "@/helpers/constants";
import Alert from "@/components/Alert";
import { Loader } from "@/components/Loader";

interface LayoutProps {
    children: ReactNode;
}


export default function Layout({ children } : LayoutProps) {
    const { error } = useError();
    const { loading } = useLoader();
    const [profilePicture, setProfilePicture] = useState<string>('');
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(fireBaseAuth, (user) => {
            if (!user) {
              window.location.href = constants.routes.home;
            } else {
              setProfilePicture(user.photoURL || '');
            }
        });
        return () => {unsubscribe();}
    },[])
  
  return (
    <>
      { error && 
        <div className="alertComponentWrapper">
            <Alert primaryMessage={error.primaryMessage} secondaryMessage={error.secondaryMessage} type={error.type} />
        </div>
      }
      <main className="w-full h-full">
        { loading && <Loader text={typeof loading === "boolean" ? "" : loading?.text} className={typeof loading === "boolean" ? "" : loading.className}/> }
        {children}
       </main>
    </>
  )
}
