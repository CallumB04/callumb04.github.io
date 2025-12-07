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
}

const RedirectButton = ({
    children,
    to,
    className,
    onClick,
    disabled,
}: RedirectButtonProps) => {
    return (
        <Link to={to}>
            <Button
                variant="primary"
                className={twMerge("cursor-pointer", className)}
                onClick={onClick}
                disabled={disabled}
            >
                {children}
            </Button>
        </Link>
    );
};

export default RedirectButton;
