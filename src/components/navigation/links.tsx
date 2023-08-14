import {NavLink} from "@/components/navigation/components/NavLinks";
import {AlternateEmailSharp, Home} from "@mui/icons-material";

export const links: NavLink[] = [
    {
        href: '/', label: 'Home', icon: <Home style={{color: "#273444"}}/>
    },
    {
        href: '/contact',
        label: 'Contact',
        icon: <AlternateEmailSharp style={{color: "#273444"}}/>
    },
];
