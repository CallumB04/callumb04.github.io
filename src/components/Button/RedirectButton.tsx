import type { ReactNode } from "react";
import Button from "./Button";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

interface RedirectButtonProps {
    children: ReactNode;
    variant?: "primary" | "secondary";
    to: string;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
    maxWidth?: boolean;
    maxWidthMobile?: boolean;
    preventTransform?: boolean; // prevent the transform on button hover
}

const RedirectButton = ({
    children,
    variant = "primary",
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
            // only sizing belongs on the link - the rest of className styles
            // the button, and applying it to both doubles up the padding
            className={twMerge(
                maxWidth ? "w-full" : "",
                maxWidthMobile ? "w-full sm:w-max" : ""
            )}
        >
            <Button
                variant={variant}
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
