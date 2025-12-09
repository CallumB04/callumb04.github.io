import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
    children: ReactNode;
    variant: "primary" | "secondary";
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
    maxWidth?: boolean;
    maxWidthMobile?: boolean;
}

const Button = ({
    children,
    variant,
    className,
    onClick,
    disabled,
    maxWidth,
    maxWidthMobile,
}: ButtonProps) => {
    return (
        <button
            className={twMerge(
                "font-primary group flex items-center justify-center gap-2 rounded-md px-4 py-3 text-sm font-medium transition-colors duration-200",
                onClick && "cursor-pointer",
                variant === "primary"
                    ? "bg-button-primary hover:bg-button-primary-hover text-button-primary-text hover:text-button-primary-text-hover"
                    : "border-button-secondary text-button-secondary-text hover:border-button-secondary-hover hover:text-button-secondary-text-hover border-2",
                maxWidth && "w-full",
                maxWidthMobile && "w-full sm:w-max",
                className
            )}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
