import React, { useState } from 'react';
import {NavLinks} from "./components";
import {links} from "./links";

const Navigation: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <nav className="z-40 relative bg-gray-800 px-4 py-3 flex justify-between items-center">
      {/*<Link href="/" className="z-40 text-4xl font-bold">*/}
      {/*  NB*/}
      {/*</Link>*/}
      <div className="mobile-nav sm:hidden">
        <button
          type="button"
          className="absolute top-3 right-4 flex text-gray-400 hover:text-white border rounded-md p-1.5 focus:text-white focus:outline-none z-50"
          onClick={() => {
            toggleNav();
          }}
        >
          nav
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
        className="hidden sm:block mr-6"
      >
        <NavLinks links={links} toggleFn={setIsNavOpen} />
      </div>
    </nav>
  );
}

export default Navigation;
