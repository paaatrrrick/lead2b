'use client'
import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ICellRendererParams, GridOptions } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

const LandingMain = () => {
  const initialRows = [
    {
      company_title: 'The Best Company in the World',
      url: 'https://thebestcompanyintheworld.com',
      ceo: 'John Doe',
      email: 'thebestcompanyintheworld@email.com',
      description: 'Developing only the best products for the world.',
    },
    {
      company_title: 'Tech Innovators Inc.',
      url: 'https://techinnovators.com',
      ceo: 'Jane Smith',
      email: 'techinnovators@email.com',
      description: 'Pioneering cutting-edge technologies.',
    },
    {
      company_title: 'Global Motors',
      url: 'https://globalmotors.com',
      ceo: 'Michael Johnson',
      email: 'globalmotors@email.com',
      description: 'Leading the automotive industry with quality vehicles.',
    },
    {
      company_title: 'Green Energy Solutions',
      url: 'https://greenenergysolutions.com',
      ceo: 'Emily Green',
      email: 'greenenergysolutions@email.com',
      description: 'Providing sustainable energy solutions for a better future.',
    },
    {
      company_title: 'InnovateTech Solutions',
      url: 'https://innovatetech.com',
      ceo: 'Sarah Williams',
      email: 'innovatetech@email.com',
      description: 'Driving innovation through technology solutions.',
    },
  ];

  const [rowData, setRowData] = useState([{
      company_title: 'The Best Company in the World',
      url: 'https://thebestcompanyintheworld.com',
      ceo: 'John Doe',
      email: 'thebestcompanyintheworld@email.com',
      description: 'Developing only the best products for the world.',
    }]);
  const [indexToShow, setIndexToShow] = useState(0);
  const text = '"Give me 5 companies with their website url, title, CEO, company email, and description"';
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setRowData((prevData) => {
        const newIndexToShow = (indexToShow + 1);
        return [...prevData, initialRows[newIndexToShow]];
      });
      setIndexToShow((prevIndex) => (prevIndex + 1));
      // if we hit 5, reset to 0 and also reset rowData to just be a list with the first item
      if (indexToShow === 4) {
        setIndexToShow(0);
        setRowData([initialRows[0]]);
      }
    }, 1000); 

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [indexToShow]);

  const colDefs: ColDef[] = [
    { headerName: 'URL', field: 'url', flex: 1, cellRenderer: LinkComponent },
    { headerName: 'Company Title', field: 'company_title', flex: 1 },
    { headerName: 'CEO', field: 'ceo', flex: 1 },
    { headerName: 'Email', field: 'email', flex: 1, cellRenderer: LinkComponent},
    { headerName: 'Description', field: 'description', flex: 1 },
  ];

  function LinkComponent(props: ICellRendererParams) {
    return (
      <a href={props.value} target='_blank' className='underline'>
        {props.value}
      </a>
    );
  }

  useEffect(() => {
  let index = 0;
  const interval = setInterval(() => {
    setDisplayedText(text.substring(0, index));
    index += 1;

    if (index > text.length) {
      clearInterval(interval);
      setShowCursor(false);
    }
  }, 60); 

  return () => clearInterval(interval);
  }, []);

  const gridOptions: GridOptions<any> = {
    columnDefs: colDefs,
    defaultColDef: {
        flex: 1,
        editable: true,
        sortable: true,
        filter: true
    },
    enableRangeSelection: true,
    copyHeadersToClipboard: true,
  };

  return (
    <div className="flex flex-col justify-start items-center h-full w-full p-28 text-white">
      <h1 className='glowing-head header' style={{ opacity: 1, transform: 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)', transformStyle: 'preserve-3d' }}>
        Cut The Grunt Work Out of <br /> 
        <span className=''>
          Lead Generation
        </span>
      </h1>
      <p className="text-center text-zinc-400" style={{fontFamily: 'Arial'}}>
        Sheetz uses AI to autonomously to search the web and find leads for your business.
      </p>
      <div className="flex flex-col justify-center items-center w-full h-full p-10 gap-2">
        <p className="text-center text-zinc-300 text-[18px]">{displayedText}{showCursor && <>|</>}</p>
        <div className='ag-theme-quartz-dark' style={{ height: '260px', width: '83%' }}>
          <AgGridReact
            rowData={rowData}
            columnDefs={colDefs}
            gridOptions={gridOptions}
            animateRows
          />
        </div>
      </div>
      <div className="h-full">
        <a href="/signup" className='main-button-n w-inline-block'>
          <div className="main-button-inner">
            <div className='main-button-text'>
            Try Sheetz For Free
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default LandingMain;
