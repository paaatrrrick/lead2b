'use client';
import React, { ReactNode, useState, createContext, useContext } from "react";

interface LayoutProps {
    children: ReactNode;
}

interface LoaderContextInput {
    text?: string,
    className?: string,
}


const LoaderContext = createContext({
    loading: undefined as unknown as LoaderContextInput | boolean,
    setLoading: (setLoading: LoaderContextInput | boolean) => {},
});
  
  export const useLoader = () => useContext(LoaderContext);
  
  export const LoaderProvider = ({ children } : LayoutProps) => {
    const [loading, setLoading] = useState<LoaderContextInput | boolean>(false);

    return (
      <LoaderContext.Provider value={{ loading, setLoading }}>
        {children}
      </LoaderContext.Provider>
    );
};
