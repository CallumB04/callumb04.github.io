import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface CardProps {
    children: ReactNode;
    onClick?: () => void; // optional function on card click
    className?: string;
}

const Card = ({ children, onClick, className }: CardProps) => {
    return (
        <div
            className={twMerge(
                "bg-card-bg text-card-fg border-card-border w-max rounded-md border p-4",
                onClick &&
                    "hover:border-card-border-hover cursor-pointer transition-colors duration-300",
                className
            )}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default Card;
