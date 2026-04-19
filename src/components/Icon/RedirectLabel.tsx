import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

interface RedirectLabelProps {
    type: "devicon" | "material";
    to: string;
    icon: string;
    label: string;
    newTab?: boolean;
    className?: string;
}

const RedirectLabel = ({
    type,
    to,
    icon,
    label,
    newTab,
    className,
}: RedirectLabelProps) => {
    return (
        <Link
            to={to}
            target={newTab ? "_blank" : ""}
            className={twMerge(
                "font-primary bg-text-primary text-button-primary-text hover:text-highlight flex h-11 items-center gap-2 rounded-md px-4 text-sm font-medium transition-colors duration-300",
                className
            )}
            onClick={(e) => e.stopPropagation()}
        >
            <i
                className={twMerge(
                    type === "devicon" && "devicon-" + icon + " text-xl",
                    type === "material" &&
                        "material-symbols-outlined text-base"
                )}
            >
                {type === "material" ? icon : ""}
            </i>
            <span>{label}</span>
        </Link>
    );
};

export default RedirectLabel;
