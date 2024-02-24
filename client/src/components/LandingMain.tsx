'use client';
import React from 'react';
import { Inconsolata } from '@next/font/google';

const LandingMain = () => {
  return (
    <div className="bg-darkColor">
      <h1 className=" text-4xl font-bold text-center mb-4" style={{ fontSize: '4.7rem', lineHeight: '1'}}>
        Cut the grunt work out of lead generation
      </h1>
      <p className="text-center text-center mx-auto max-w-[52rem] text-white60" style={{fontFamily: 'Inconsolata, "Times New Roman"', lineHeight: '1.5'}}>
        95% of lead generation is spent manually going through websites looking. Lead2B automates that whole process
      </p>
    </div>
  );
};

export default LandingMain;
