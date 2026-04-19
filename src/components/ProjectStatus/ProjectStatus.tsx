import { twMerge } from "tailwind-merge";
import type { ProjectStatusType } from "../../data/models";

interface StatusStyle {
    label: string;
    dot: string;
    bg: string;
    text: string;
    border: string;
}

const STATUS_STYLES: Record<ProjectStatusType, StatusStyle> = {
    finished: {
        label: "Finished",
        dot: "bg-emerald-400",
        bg: "bg-emerald-400/10",
        text: "text-emerald-400",
        border: "border-emerald-400/30",
    },
    "in-progress": {
        label: "In Progress",
        dot: "bg-highlight animate-pulse",
        bg: "bg-highlight/10",
        text: "text-highlight",
        border: "border-highlight/30",
    },
    "on-hold": {
        label: "On Hold",
        dot: "bg-amber-400",
        bg: "bg-amber-400/10",
        text: "text-amber-400",
        border: "border-amber-400/30",
    },
    discontinued: {
        label: "Discontinued",
        dot: "bg-text-tertiary",
        bg: "bg-text-tertiary/10",
        text: "text-text-tertiary",
        border: "border-text-tertiary/40",
    },
};

interface ProjectStatusProps {
    status: ProjectStatusType;
    size?: "sm" | "md";
    className?: string;
}

const ProjectStatus = ({
    status,
    size = "sm",
    className,
}: ProjectStatusProps) => {
    const s = STATUS_STYLES[status];
    const sizeClasses =
        size === "md"
            ? "gap-1.5 px-2 py-0.5 text-[11px] sm:gap-2 sm:px-2.5 sm:py-1 sm:text-[13px]"
            : "gap-1.5 px-2 py-0.5 text-[11px]";
    const dotSize = size === "md" ? "size-1.5 sm:size-2" : "size-1.5";
    return (
        <span
            className={twMerge(
                "font-mono inline-flex w-max items-center rounded-md border font-medium tracking-wide",
                sizeClasses,
                s.bg,
                s.text,
                s.border,
                className
            )}
        >
            <span className={twMerge("rounded-full", dotSize, s.dot)} />
            {s.label}
        </span>
    );
};

export default ProjectStatus;
