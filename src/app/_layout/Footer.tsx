"use server"
import React from 'react';

const FooterPage = async() => {
  return (
    <footer className="bg-[var(--app-bg)] border-t flex justify-center items-center border-gray-200 sticky top-0 w-full z-50 h-[var(--footer-height)]">
       <p className="text-center inter text-[var(--app-text)]">&copy; SmartBlog</p>
    </footer>
  );
};

export default FooterPage;
