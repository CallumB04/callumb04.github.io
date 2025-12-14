import { useMemo, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface TextProps {
    children: ReactNode;
    variant: "primary" | "secondary" | "highlight" | "highlight-soft";
    redirect?: boolean; // text is for redirecting (<Link />)
    className?: string;
}

const Text = ({ children, variant, redirect, className }: TextProps) => {
    // update text color in tailwind classes when variant changes
    const variantClassName = useMemo(() => {
        switch (variant) {
            case "primary":
                return "text-text-primary";
            case "secondary":
                return "text-text-secondary";
            case "highlight":
                return "text-highlight";
            case "highlight-soft":
                return "text-highlight-soft";
        }
    }, [variant]);

    return (
        <p
            className={twMerge(
                "font-primary",
                variantClassName,
                redirect &&
                    "group-hover:text-highlight cursor-pointer transition-colors duration-300",
                className
            )}
        >
            {children}
        </p>
    );
};

export default Text;
