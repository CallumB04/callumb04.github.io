import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import Icon from "../Icon/Icon";

export const EMAIL = "burgoynecallum04@gmail.com";

interface CopyEmailProps {
    className?: string;
}

// Copies my email address, and confirms it in place for a couple of seconds
const CopyEmail = ({ className }: CopyEmailProps) => {
    const [copied, setCopied] = useState(false);
    const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        return () => {
            if (timeout.current) clearTimeout(timeout.current);
        };
    }, []);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(EMAIL);
            setCopied(true);
            if (timeout.current) clearTimeout(timeout.current);
            timeout.current = setTimeout(() => setCopied(false), 2000);
        } catch {
            // no-op
        }
    };

    return (
        <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? "Email address copied" : "Copy email address"}
            className={twMerge(
                "group border-card-border bg-card-bg hover:border-highlight/60 relative flex w-max cursor-pointer items-center gap-2.5 rounded-md border px-4 py-2.5 text-sm font-medium transition-colors duration-300",
                className
            )}
        >
            <Icon
                icon={copied ? "check" : "content_copy"}
                variant={copied ? "highlight" : "primary"}
                className="group-hover:text-highlight text-xs"
            />
            {/* both labels share one grid cell, so the button keeps the width
                of the longer one and doesn't jump when the text swaps */}
            <span className="grid text-left">
                <span
                    className={twMerge(
                        "text-text-primary col-start-1 row-start-1 transition-opacity duration-200",
                        copied && "opacity-0"
                    )}
                >
                    {EMAIL}
                </span>
                <span
                    aria-hidden={!copied}
                    className={twMerge(
                        "text-highlight col-start-1 row-start-1 opacity-0 transition-opacity duration-200",
                        copied && "opacity-100"
                    )}
                >
                    Copied to clipboard
                </span>
            </span>
        </button>
    );
};

export default CopyEmail;
