import { useMemo, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface TextProps {
    children: ReactNode;
    variant: "primary" | "secondary" | "highlight" | "highlight-soft";
    redirect?: boolean; // text is for redirecting (<Link />)
    as?: "p" | "h1" | "h2" | "h3" | "span"; // element to render, headings use the display font
    className?: string;
}

const Text = ({
    children,
    variant,
    redirect,
    as = "p",
    className,
}: TextProps) => {
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

    const Element = as;
    const isHeading = as === "h1" || as === "h2" || as === "h3";

    return (
        <Element
            className={twMerge(
                isHeading ? "font-display tracking-tight" : "font-primary",
                variantClassName,
                redirect &&
                    "group-hover:text-highlight cursor-pointer transition-colors duration-300",
                className
            )}
        >
            {children}
        </Element>
    );
};

export default Text;
