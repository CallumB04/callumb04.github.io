import { Link } from "react-router-dom";
import Text from "../../components/Text/Text";
import Icon from "../../components/Icon/Icon";

interface NavbarItemProps {
    text: string;
    icon: string; // material icon for mobile devices
    to: string;
}

const NavbarItem = ({ text, icon, to }: NavbarItemProps) => {
    return (
        <Link to={to} className="group relative flex items-center p-1">
            <Text variant="primary" redirect className="hidden md:inline">
                {text}
            </Text>
            <Icon
                icon={icon}
                variant="primary"
                className="group-hover:text-highlight md:hidden!"
                title={text}
            ></Icon>
            {/* Hover Underline Effect */}
            <span className="bg-highlight-soft absolute bottom-0 left-1/2 mx-auto hidden h-px w-0 -translate-x-1/2 transition-all duration-500 group-hover:w-full md:inline"></span>
        </Link>
    );
};

export default NavbarItem;
