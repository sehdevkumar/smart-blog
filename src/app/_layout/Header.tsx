"use server"
import Link from 'next/link';
import React from 'react';

const HeaderPage = async() => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 w-full z-50 h-[var(--header-height)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex w-full justify-between">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <div className="text-2xl font-bold text-gray-900">SmartBlog</div>
              </Link>
            </div>
            <nav className="flex items-center justify-center md:space-x-8">
              <Link href="/">
                <div className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">Home</div>
              </Link>
              <Link href="/about">
                <div className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">About</div>
              </Link>
              <Link href="/contact">
                <div className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">Contact</div>
              </Link>
            </nav>
          </div>
      
        </div>
      </div>
    </header>
  );
};

export default HeaderPage;
