import Link from "next/link";

interface NavButtonProps {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const NavButton: React.FC<NavButtonProps> = ({href, label, icon, ...props}) => {

  return (
    <Link {...props} href={href}
          className="flex items-center justify-center border border-gray-light w-10 h-10 rounded-full p-1 group hover:w-full transition-width duration-500 ease-in-out overflow-hidden">
      <div
        className="flex items-center justify-center w-full h-full rounded-full bg-gray-light opacity-70 group-hover:opacity-100 transition-opacity duration-300 ease-in-out p-2"
      >
        {icon && <span className="group-hover:hidden">
            {icon}
        </span>}
        <span
          className="hidden text-sm font-bold text-transparent text-gray-dark group-hover:inline-block group-hover:text-gray-dark">
            {label}
        </span>
      </div>
    </Link>
  );
};

export default NavButton;
