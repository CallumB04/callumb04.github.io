import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

interface RedirectIconProps {
    type: "devicon" | "material";
    to: string;
    icon: string;
    newTab?: boolean;
    title?: string;
    className?: string;
}

const RedirectIcon = ({
    type,
    to,
    icon,
    newTab,
    title,
    className,
}: RedirectIconProps) => {
    return (
        <Link
            to={to}
            target={newTab ? "_blank" : ""}
            className={twMerge(
                "border-card-border hover:border-card-border-hover flex size-9 items-center justify-center rounded-full border transition-colors duration-300",
                className
            )}
            title={title}
            onClick={(e) => e.stopPropagation()}
        >
            <i
                className={twMerge(
                    type === "devicon" && icon + " " + "text-xl",
                    type === "material" && "material-symbols-outlined text-base"
                )}
            >
                {type === "material" ? icon : ""}
            </i>
        </Link>
    );
};

export default RedirectIcon;
