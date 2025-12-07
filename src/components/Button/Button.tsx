import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
    children: ReactNode;
    variant: "primary" | "secondary";
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
}

const Button = ({
    children,
    variant,
    className,
    onClick,
    disabled,
}: ButtonProps) => {
    return (
        <button
            className={twMerge(
                "flex items-center justify-center transition-colors duration-300 text-text-dark rounded-md gap-2 px-4 py-2.5 font-primary font-medium",
                onClick && "cursor-pointer",
                variant === "primary"
                    ? "bg-button hover:bg-button-hover"
                    : "border-2 border-button hover:border-button-hover",
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
