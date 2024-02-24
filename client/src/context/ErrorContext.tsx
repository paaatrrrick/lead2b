'use client';
import React, { ReactNode, useState, createContext, useContext, useEffect } from "react";
import constants from "@/helpers/constants";
import { set } from "firebase/database";


interface LayoutProps {
    children: ReactNode;
}

type typeEnum = 'success' | 'error' | 'warning';

interface ErrorContextProps {
    primaryMessage: string,
    secondaryMessage: string,
    type: typeEnum,
    timeout: number,
}


interface ErrorContextInput {
    primaryMessage?: string,
    secondaryMessage?: string,
    type?: typeEnum,
    timeout?: number,
}


const ErrorContext = createContext({
    error: undefined as ErrorContextProps | undefined,
    setError: (error: ErrorContextInput) => {},
});
  
  export const useError = () => useContext(ErrorContext);
  
  export const ErrorProvider = ({ children } : LayoutProps) => {
    const [error, setError] = useState<ErrorContextProps | undefined>(undefined);
    const [timeoutId, setTimeoutId] = useState<number | undefined>(undefined);


    useEffect(() => {
        if (!error) return;
        if (timeoutId) {
            clearTimeout(timeoutId);
            setTimeoutId(undefined);
        }
        const timeout = setTimeout(clearError, error.timeout);
        const numberTimeout = timeout as unknown as number;
        setTimeoutId(numberTimeout);
    }, [error]);

    const clearError = () => {
        setError(undefined);
        setTimeoutId(undefined);
    }

    const setErrorWrapper = ({primaryMessage, secondaryMessage, timeout, type} : ErrorContextInput) => {
        setError({primaryMessage : primaryMessage || 'Oops, we ran into an error', secondaryMessage: secondaryMessage || '', timeout: timeout || constants.errorTimeout, type: type || 'error'});
    }

    return (
      <ErrorContext.Provider value={{ error, setError : setErrorWrapper }}>
        {children}
      </ErrorContext.Provider>
    );
};
