import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

interface RedirectDeviconProps {
    to: string;
    icon: string;
    newTab?: boolean;
    title?: string;
}

const RedirectDevicon = ({ to, icon, newTab, title }: RedirectDeviconProps) => {
    return (
        <Link
            to={to}
            target={newTab ? "_blank" : ""}
            className="border-card-border hover:border-card-border-hover flex items-center justify-center rounded-full border p-2 transition-colors duration-200"
            title={title}
            onClick={(e) => e.stopPropagation()}
        >
            <i className={twMerge(icon, "text-xl")}></i>
        </Link>
    );
};

export default RedirectDevicon;
