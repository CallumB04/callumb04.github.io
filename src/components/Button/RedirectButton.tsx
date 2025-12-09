import type { ReactNode } from "react";
import Button from "./Button";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

interface RedirectButtonProps {
    children: ReactNode;
    to: string;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
    maxWidth?: boolean;
    maxWidthMobile?: boolean;
}

const RedirectButton = ({
    children,
    to,
    className,
    onClick,
    disabled,
    maxWidth,
    maxWidthMobile,
}: RedirectButtonProps) => {
    return (
        <Link
            to={to}
            className={twMerge(
                maxWidth ? "w-full" : "",
                maxWidthMobile ? "w-full sm:w-max" : ""
            )}
        >
            <Button
                variant="primary"
                className={twMerge("cursor-pointer", className)}
                onClick={onClick}
                disabled={disabled}
                maxWidth={maxWidth}
                maxWidthMobile={maxWidthMobile}
            >
                {children}
            </Button>
        </Link>
    );
};

export default RedirectButton;
