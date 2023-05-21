import Link from "next/link";
import {AlternateEmailOutlined, HomeSharp} from "@mui/icons-material";

interface NavButtonProps {
  label: string;
  href: string;
}

const NavButton: React.FC<NavButtonProps> = ({href, label, ...props}) => {
  const icon = (label: string) => {
    if (label === "Contact") {
      return (
        // <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2"
        //      strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        //   <path
        //     d="M21 10.59l-4.17-4.17a2 2 0 0 0-2.83 0L3 16.59a2 2 0 0 0 0 2.83l4.17 4.17a2 2 0 0 0 2.83 0L21 10.59a2 2 0 0 0 0-2.83z"></path>
        //   <line x1="3" y1="21" x2="3.01" y2="21"></line>
        // </svg>

        <AlternateEmailOutlined stroke="#000000" fill="#000000" width="24" height="24"/>
      );
    } else if (label === "Home") {
      return (
        <HomeSharp color="secondary" width="24" height="24"/>
        // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00008B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        //     <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2h-14a2 2 0 0 1-2-2z"></path>
        //     <polyline points="9 22 9 12 15 12 15 22"></polyline>
        // </svg>


      );
    }
    return null;
  };

  return (
    <Link {...props} href={href}
          className="flex items-center justify-center border border-gray-light w-10 h-10 rounded-full p-1 group hover:w-full transition-width duration-500 ease-in-out overflow-hidden">
      <div
        className="flex items-center justify-center w-full h-full rounded-full bg-gray-light opacity-70 group-hover:opacity-100 transition-opacity duration-300 ease-in-out p-2"
      >
        <span className="group-hover:hidden">
            {icon(label)}
        </span>
        <span
          className="hidden text-sm font-bold text-transparent text-gray-dark group-hover:inline-block group-hover:text-gray-dark">
            {label}
        </span>
      </div>
    </Link>
  );
};

export default NavButton;
