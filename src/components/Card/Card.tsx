import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface CardProps {
    children: ReactNode;
    className?: string;
}

const Card = ({ children, className }: CardProps) => {
    return (
        <div
            className={twMerge(
                "bg-card-bg text-card-fg border-card-border w-max rounded-md border-1 p-4",
                className
            )}
        >
            {children}
        </div>
    );
};

export default Card;
