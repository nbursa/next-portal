import React from "react";
import Link from "next/link";

type NavLink = {
  href: string;
  label: string;
}

interface NavigationProps {
  links: NavLink[];
  classNames?: string;
  toggleFn: (value: boolean) => void;
}

const NavLinks: React.FC<NavigationProps> = ({links, classNames = "", toggleFn}) => {
  const handleClick = () => {
    toggleFn(false);
  };

  return (
    <div className={classNames}>
      {links.map(({href, label}, index) => (
        <Link key={index} href={href} onClick={handleClick} className="text-gray-300 hover:text-white hover:underline px-3 py-2 rounded-md text-sm font-medium">
          {label}
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;