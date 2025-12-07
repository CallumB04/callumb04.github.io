import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface TextProps {
    children: ReactNode;
    variant: "primary" | "secondary";
    className?: string;
}

const Text = ({ children, variant, className }: TextProps) => {
    return (
        <p
            className={twMerge(
                "font-primary",
                variant === "primary"
                    ? "text-text-primary"
                    : "text-text-secondary",
                className
            )}
        >
            {children}
        </p>
    );
};

export default Text;
