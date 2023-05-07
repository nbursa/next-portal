import React, { useState } from 'react';
import {NavLinks} from "./components";
import {links} from "./links";
import Link from "next/link";

const Navigation: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <nav className="z-40 h-[64px] relative bg-gray-800 px-4 py-3 flex justify-between items-center">
      <Link href="/" className="z-40 text-4xl font-bold flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <circle cx="12" cy="12" r="12" fill="#ffffff" />
        </svg>
      </Link>
      <div className="mobile-nav sm:hidden">
        <button
          type="button"
          className="absolute top-3 right-4 flex text-gray-400 hover:text-white rounded-md p-1.5 focus:text-white focus:outline-none z-50"
          onClick={() => {
            toggleNav();
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="#fff" d="M2.25 6.75H21.75V8.25H2.25V6.75ZM2.25 11.25H21.75V12.75H2.25V11.25ZM2.25 15.75H21.75V17.25H2.25V15.75Z" />
          </svg>
        </button>
        <div
          className={`z-30 fixed overflow-hidden bg-gray-dark transition-all duration-300 ${
            isNavOpen ? 'top-0 left-0 right-0 bottom-0' : 'top-3 left-full right-4 bottom-full'
          }`}
        >
          <NavLinks links={links} classNames="flex flex-grow-1 flex-col justify-center items-center w-full h-full" toggleFn={setIsNavOpen} />
        </div>
      </div>
      <div
        className="hidden sm:block"
      >
        <NavLinks links={links} toggleFn={setIsNavOpen} />
      </div>
    </nav>
  );
}

export default Navigation;
