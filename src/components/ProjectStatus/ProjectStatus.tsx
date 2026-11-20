import { twMerge } from "tailwind-merge";
import type { ProjectStatusType } from "../../data/models";

interface StatusStyle {
    label: string;
    dot: string;
    text: string;
}

const STATUS_STYLES: Record<ProjectStatusType, StatusStyle> = {
    live: {
        label: "Live",
        dot: "bg-emerald-400 animate-pulse",
        text: "text-emerald-400",
    },
    finished: {
        label: "Finished",
        dot: "bg-violet-300",
        text: "text-violet-300",
    },
    "in-progress": {
        label: "In progress",
        dot: "bg-highlight animate-pulse",
        text: "text-highlight",
    },
    "on-hold": {
        label: "On hold",
        dot: "bg-amber-400",
        text: "text-amber-400",
    },
    discontinued: {
        label: "Discontinued",
        dot: "bg-text-tertiary",
        text: "text-text-tertiary",
    },
};

interface ProjectStatusProps {
    status: ProjectStatusType;
    size?: "sm" | "md";
    className?: string;
}

// A coloured dot and the status in words - no box around it
const ProjectStatus = ({
    status,
    size = "sm",
    className,
}: ProjectStatusProps) => {
    const s = STATUS_STYLES[status];
    return (
        <span
            className={twMerge(
                "font-primary inline-flex w-max shrink-0 items-center gap-1.5 font-medium",
                size === "md" ? "text-sm sm:text-base" : "text-sm",
                s.text,
                className
            )}
        >
            <span
                className={twMerge(
                    "rounded-full",
                    size === "md" ? "size-2" : "size-1.5",
                    s.dot
                )}
            />
            {s.label}
        </span>
    );
};

export default ProjectStatus;
