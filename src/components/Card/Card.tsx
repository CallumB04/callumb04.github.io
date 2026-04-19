import type { CSSProperties, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface CardProps {
    children: ReactNode;
    onClick?: () => void; // optional function on card click
    className?: string;
    style?: CSSProperties;
}

const Card = ({ children, onClick, className, style }: CardProps) => {
    return (
        <div
            className={twMerge(
                "bg-card-bg text-card-fg border-card-border w-max rounded-md border p-4",
                onClick &&
                    "hover:border-card-border-hover hover:shadow-highlight/10 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg",
                className
            )}
            style={style}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default Card;
