import {
  NavLink
} from "@/components/navigation/components/NavLinks";
import Image from "next/image";

export const links: NavLink[] = [
  {
    href: '/', label: 'Home', icon: null
  },
  {
    href: '/contact',
    label: 'Contact',
    icon: <Image src='/assets/email.svg' width={25} height={25} alt='email icon'/>
  },
  // {
  //   href: '/ai-journals',
  //   label: 'AI Journals',
  //   icon: <Image src='/assets/memory.svg' width={25} height={25} alt='ai icon'/>
  // }
];
