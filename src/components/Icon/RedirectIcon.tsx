import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import Text from "../Text/Text";

interface RedirectIconProps {
    type: "devicon" | "material";
    to: string;
    icon: string;
    newTab?: boolean;
    hoverText?: string;
    className?: string;
    iconClassName?: string;
}

const RedirectIcon = ({
    type,
    to,
    icon,
    newTab,
    hoverText,
    className,
    iconClassName,
}: RedirectIconProps) => {
    return (
        <Link
            to={to}
            target={newTab ? "_blank" : ""}
            className={twMerge(
                "group text-button-primary-text bg-text-primary hover:text-highlight relative flex h-9 w-max items-center justify-center gap-2 rounded-full px-3 transition-colors duration-300 sm:w-9 sm:px-0",
                className
            )}
            onClick={(e) => e.stopPropagation()}
        >
            <i
                className={twMerge(
                    type === "devicon" && "devicon-" + icon + " " + "text-xl",
                    type === "material" &&
                        "material-symbols-outlined text-base",
                    iconClassName
                )}
            >
                {type === "material" ? icon : ""}
            </i>
            {/* Text next to icon - Small Screens */}
            <Text
                variant="primary"
                className="text-button-primary-text group-hover:text-highlight text-xs font-medium transition-colors duration-300 sm:hidden"
            >
                {hoverText}
            </Text>
            {/* Hover Text - Large Screens */}
            <Text
                variant="primary"
                className="pointer-events-none absolute bottom-0 left-1/2 w-max -translate-x-1/2 text-center text-xs font-medium opacity-0 transition-all duration-300 sm:group-hover:-bottom-6 sm:group-hover:opacity-100"
            >
                {hoverText}
            </Text>
        </Link>
    );
};

export default RedirectIcon;
