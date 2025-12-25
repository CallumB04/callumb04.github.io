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
                "border-card-border group hover:border-card-border-hover text-text-primary hover:bg-card-border-hover relative flex size-9 items-center justify-center rounded-full border transition-colors duration-300",
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
