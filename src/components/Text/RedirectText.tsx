import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import Text from "../Text/Text";
import Icon from "../Icon/Icon";

interface RedirectTextProps {
    to: string;
    children: string;
    newTab?: boolean;
    className?: string;
    textClassName?: string;
}

const RedirectText = ({
    to,
    children,
    newTab,
    className,
    textClassName,
}: RedirectTextProps) => {
    return (
        <Link
            to={to}
            target={newTab ? "_blank" : ""}
            className={twMerge(
                "group border-text-primary hover:border-highlight flex items-center gap-1.5 border-b border-dotted p-0.5 pt-0 transition-colors duration-300",
                className
            )}
            onClick={(e) => e.stopPropagation()}
        >
            <Text
                variant="primary"
                redirect
                className={twMerge(
                    "group-hover:text-highlight text-sm",
                    textClassName
                )}
            >
                {children}
            </Text>
            <Icon
                icon="arrow_right_alt"
                variant="primary"
                className="group-hover:text-highlight text-xs"
            />
        </Link>
    );
};

export default RedirectText;
