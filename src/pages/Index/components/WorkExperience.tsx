import { twMerge } from "tailwind-merge";
import Card from "../../../components/Card/Card";
import Icon from "../../../components/Icon/Icon";
import Skill from "../../../components/Skill/Skill";
import Text from "../../../components/Text/Text";

interface WorkExperienceProps {
    timeframe: string; // Jan 2024 - Feb 2025
    workplace: string;
    role: string;
    workLogo: string; // /public/work_logos/<imageFile>
    details?: string[]; // bullet points
    technologies?: string[];
    isCurrent?: boolean;
    isLast?: boolean;
}

const WorkExperience = ({
    timeframe,
    workplace,
    role,
    workLogo,
    details,
    technologies,
    isCurrent,
    isLast,
}: WorkExperienceProps) => {
    return (
        <div className="relative flex gap-4 pb-6 last:pb-0 xl:-ml-[28px] xl:w-[calc(100%_+_28px)]">
            {/* Timeline rail (desktop) */}
            <div className="relative hidden w-3 flex-shrink-0 sm:block">
                <span
                    className={twMerge(
                        "ring-page-bg absolute top-6 left-1/2 size-3 -translate-x-1/2 rounded-full ring-4",
                        isCurrent
                            ? "bg-highlight animate-timeline-pulse"
                            : "bg-card-border-hover"
                    )}
                ></span>
                {!isLast && (
                    <span className="from-card-border-hover to-card-border absolute top-10 bottom-[-0.5rem] left-1/2 w-px -translate-x-1/2 bg-gradient-to-b"></span>
                )}
            </div>
            <Card className="flex w-full flex-col gap-3">
                <div className="flex w-full flex-row-reverse gap-4 sm:flex-row">
                    <img
                        src={"/work_logos/" + workLogo}
                        className="border-card-border size-14 rounded-full border"
                    />
                    {/* Job Info */}
                    <div className="flex w-full flex-col gap-0.5">
                        <span className="bg-card-bg-elevated text-text-tertiary border-card-border mb-1 inline-flex w-max items-center gap-1.5 rounded-md border px-2 py-0.5 font-mono text-[11px] font-medium tracking-wide">
                            <i
                                className="material-symbols-outlined"
                                style={{ fontSize: "14px" }}
                            >
                                calendar_month
                            </i>
                            {timeframe}
                        </span>
                        <Text variant="primary" className="font-semibold">
                            {workplace}
                        </Text>
                        <Text variant="secondary" className="text-sm">
                            {role}
                        </Text>
                    </div>
                </div>
                {/* Bullet point details */}
                {details && (
                    <div className="flex flex-col gap-1.5 sm:ml-18">
                        {details.map((d) => (
                            <span key={d} className="flex gap-1.5">
                                <Icon
                                    variant="highlight"
                                    icon="subdirectory_arrow_right"
                                    className="text-xs"
                                />
                                <Text variant="secondary" className="text-sm">
                                    {d}
                                </Text>
                            </span>
                        ))}
                    </div>
                )}
                {/* Technologies */}
                {technologies && (
                    <span className="mt-1 flex flex-wrap gap-1 sm:ml-18">
                        {technologies.map((t) => (
                            <Skill key={t} skill={t} />
                        ))}
                    </span>
                )}
            </Card>
        </div>
    );
};

export default WorkExperience;
