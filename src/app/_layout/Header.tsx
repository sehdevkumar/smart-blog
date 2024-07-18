"use client";
import React from 'react';
import DynamicHeaderPage from './DynamicHeader';

const HeaderPage = () => {
   


  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 w-full z-50 h-[var(--header-height)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          <DynamicHeaderPage/>
      
        </div>
      </div>
    </header>
  );
};

export default HeaderPage;
