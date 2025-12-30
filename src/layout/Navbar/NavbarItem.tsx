import { Link } from "react-router-dom";
import Text from "../../components/Text/Text";
import Icon from "../../components/Icon/Icon";

interface NavbarItemProps {
    text: string;
    icon: string; // material icon
    to: string;
}

const NavbarItem = ({ text, icon, to }: NavbarItemProps) => {
    return (
        <Link to={to} className="group relative flex items-center p-1">
            <Icon
                icon={icon}
                variant="primary"
                className="group-hover:text-highlight"
            ></Icon>
            <Text
                variant="primary"
                redirect
                className="bg-navbar-bg pointer-events-none absolute bottom-0 left-1/2 z-99 w-max -translate-x-1/2 rounded-full px-2 py-1 text-sm font-medium opacity-0 transition-all duration-250 ease-in-out sm:group-hover:-bottom-11 sm:group-hover:opacity-100"
            >
                {text}
            </Text>
        </Link>
    );
};

export default NavbarItem;
