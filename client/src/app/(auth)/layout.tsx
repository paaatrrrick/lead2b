'use client';
import React, { ReactNode, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { fireBaseAuth } from '@/helpers/firebase';
import constants from "@/helpers/constants";


interface LayoutProps {
    children: ReactNode;
}
export default function ProtectedRoutes({ children } : LayoutProps) {
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(fireBaseAuth, (user) => {
            if (user) window.location.href = constants.routes.defaultAuthenticatedRoute;
        });
        return () => {unsubscribe();}
    },[])

  return (
    <>
        {children}
    </>
  )
}
