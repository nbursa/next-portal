import {NavLink} from "@/components/navigation/components/NavLinks";
import {AlternateEmailSharp, HomeSharp} from "@mui/icons-material";

const HomeSharpIcon = () => <HomeSharp color="primary"/>;
const ContactSharpIcon = () => <AlternateEmailSharp color="primary"/>;

export const links: NavLink[] = [
  {href: '/', label: 'Home', icon: <HomeSharpIcon/>},
  {href: '/contact', label: 'Contact', icon: <ContactSharpIcon/>},
];
