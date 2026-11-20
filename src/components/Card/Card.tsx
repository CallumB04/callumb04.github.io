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
                // the faint inset line along the top edge catches the light,
                // so cards sit slightly above the page rather than flat on it
                "group/card bg-card-bg text-card-fg border-card-border w-max rounded-md border p-4 inset-shadow-[0_1px_0_rgb(255_255_255/0.04)]",
                onClick &&
                    "hover:border-card-border-hover hover:shadow-highlight/10 cursor-pointer transition-[border-color,box-shadow] duration-300 hover:shadow-lg",
                className
            )}
            style={style}
            onClick={onClick}
            // clickable cards are reachable and openable from the keyboard too
            role={onClick ? "link" : undefined}
            tabIndex={onClick ? 0 : undefined}
            onKeyDown={
                onClick
                    ? (e) => {
                          if (
                              e.key === "Enter" &&
                              e.target === e.currentTarget
                          ) {
                              onClick();
                          }
                      }
                    : undefined
            }
        >
            {children}
        </div>
    );
};

export default Card;
