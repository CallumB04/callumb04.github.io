import { Link, useLocation } from "react-router-dom";
import Text from "../../components/Text/Text";
import Icon from "../../components/Icon/Icon";
import { twMerge } from "tailwind-merge";

interface NavbarItemProps {
    text: string;
    icon: string; // material icon
    to: string;
    className?: string;
    suppressActive?: boolean;
}

const NavbarItem = ({
    text,
    icon,
    to,
    className,
    suppressActive,
}: NavbarItemProps) => {
    const location = useLocation();

    const isActive = (() => {
        if (suppressActive) return false;
        // Hash links (e.g. /#work)
        if (to.includes("#")) {
            const [path, hash] = to.split("#");
            const targetPath = path || "/";
            return (
                location.pathname === targetPath &&
                location.hash === "#" + hash
            );
        }
        // Home — only active if on / with no hash
        if (to === "/") {
            return location.pathname === "/" && !location.hash;
        }
        // Section parents — also match their detail routes
        if (to === "/projects" || to === "/blogs") {
            return location.pathname.startsWith(to);
        }
        return location.pathname === to;
    })();

    return (
        <Link
            to={to}
            className={twMerge(
                "group/navitem relative flex items-center px-2 py-2 sm:px-5",
                className
            )}
        >
            <Icon
                icon={icon}
                variant="primary"
                className={twMerge(
                    "group-hover/navitem:text-highlight transition-colors",
                    isActive && "text-highlight"
                )}
            ></Icon>
            {/* Active indicator dot */}
            {isActive && (
                <span className="bg-highlight absolute -bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full sm:-bottom-1"></span>
            )}
            <Text
                variant="primary"
                redirect
                className="bg-navbar-bg pointer-events-none absolute bottom-0 left-1/2 z-99 w-max -translate-x-1/2 rounded-full px-2 py-1 text-sm font-medium opacity-0 transition-all duration-250 ease-in-out sm:group-hover/navitem:-bottom-11 sm:group-hover/navitem:opacity-100"
            >
                {text}
            </Text>
        </Link>
    );
};

export default NavbarItem;
