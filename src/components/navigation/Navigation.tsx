import React, {useState} from 'react';
import {NavLinks} from "./components";
import {links} from "./links";
import Link from "next/link";
import NavButton from "../common/NavButton";
import {useRouter} from "next/router";

const Navigation: React.FC = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const currentYear = new Date().getFullYear();

    const {asPath} = useRouter();

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    return (
        <>
            <nav
                className="z-40 h-[64px] fixed top-0 left-0 w-full bg-[#172235]/75 backdrop-blur-sm sm:bg-transparent px-5 flex justify-between items-center sm:hidden">
                <Link href="/" className="z-40 text-4xl font-bold flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                        <circle cx="12" cy="12" r="12" fill="#ffffff"/>
                    </svg>
                    <span className="text-xs font-bold -ml-4 mix-blend-difference">nenadbursac</span>
                    <span className="text-thin text-xs ml-0.5 mix-blend-difference">{currentYear}</span>
                </Link>
                <div className="mobile-nav sm:hidden">
                    <button
                        type="button"
                        className="absolute top-3 right-3 flex text-gray-400 hover:text-white rounded-md p-1.5 focus:text-white focus:outline-none z-50"
                        onClick={() => {
                            toggleNav();
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="#fff"
                                  d="M2.25 6.75H21.75V8.25H2.25V6.75ZM2.25 11.25H21.75V12.75H2.25V11.25ZM2.25 15.75H21.75V17.25H2.25V15.75Z"/>
                        </svg>
                    </button>
                    <div
                        className={`z-30 fixed overflow-hidden bg-gray-dark transition-all duration-300 ${
                            isNavOpen ? 'top-0 right-0 bottom-0 h-screen w-screen' : 'top-3 left-auto right-4 bottom-auto w-4 h-4 bg-transparent text-transparent'
                        }`}
                    >
                        <NavLinks links={links}
                                  classNames="flex flex-grow-1 flex-col justify-center items-center w-full h-full -mt-20"
                                  toggleFn={setIsNavOpen}/>
                    </div>
                </div>
                {/*<div*/}
                {/*    className="hidden sm:block"*/}
                {/*>*/}
                {/*    <NavLinks links={links} toggleFn={setIsNavOpen}/>*/}
                {/*</div>*/}
            </nav>
            <Link href="/"
                  className="hidden absolute top-1/2 left-4 z-40 text-4xl font-bold sm:flex items-center justify-center -translate-y-1/2 -rotate-90 origin-top-left opacity-50 hover:opacity-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                    <circle cx="12" cy="12" r="12" fill="#ffffff"/>
                </svg>
                <span className="text-xs font-bold -ml-4 mix-blend-difference">nenadbursac</span>
                <span className="text-thin text-xs ml-0.5 mix-blend-difference">{currentYear}</span>
            </Link>
            <div
                className="hidden sm:flex absolute top-1/3 right-0 px-4 pt-4 flex-col items-end justify-center gap-6 translate-y-1/2 opacity-50 hover:opacity-100">
                {links.map((link, index) => (
                    link.href !== asPath &&
                    <NavButton key={index} href={link.href} label={link.label} icon={link.icon}/>
                ))}
            </div>
        </>
    );
}

export default Navigation;
