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
        <Link to={to} className="flex items-center">
            <Text variant="primary" redirect className="hidden md:inline">
                {text}
            </Text>
            <Icon
                icon={icon}
                variant="primary"
                className="hover:text-highlight md:hidden!"
            ></Icon>
        </Link>
    );
};

export default NavbarItem;
