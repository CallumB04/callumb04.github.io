import { useMemo } from "react";
import { twMerge } from "tailwind-merge";

interface IconProps {
    icon: string;
    variant: "primary" | "highlight" | "button";
    title?: string;
    className?: string;
    onClick?: () => void;
}

const Icon = ({ icon, variant, title, className, onClick }: IconProps) => {
    // update icon color in tailwind classes when variant changes
    const variantClassName = useMemo(() => {
        switch (variant) {
            case "primary":
                return "text-text-primary";
            case "highlight":
                return "text-highlight hover:text-highlight-soft";
            case "button":
                return "text-button-primary-text group-hover:text-button-primary-text-hover text-sm";
        }
    }, [variant]);
    return (
        <i
            className={twMerge(
                "material-symbols-outlined transition-colors duration-200",
                variantClassName,
                onClick && "hover:text-highlight cursor-pointer",
                className
            )}
            onClick={onClick}
            title={title}
        >
            {icon}
        </i>
    );
};

export default Icon;
