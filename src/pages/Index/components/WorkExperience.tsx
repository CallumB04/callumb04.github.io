import { twMerge } from "tailwind-merge";
import { Link } from "react-router-dom";
import Card from "../../../components/Card/Card";
import Icon from "../../../components/Icon/Icon";
import Skill from "../../../components/Skill/Skill";
import Text from "../../../components/Text/Text";
import type { BlogPost, WorkRole, Workplace } from "../../../data/models";

interface WorkExperienceProps {
    workplace: Workplace;
    blogPosts: BlogPost[]; // all posts, filtered per role by relatedRole
    isLast?: boolean;
}

// Timeframe badge, e.g. "Jan 2025 - Current"
const Timeframe = ({ timeframe }: { timeframe: string }) => (
    <span className="bg-card-bg-elevated text-text-tertiary border-card-border mb-1 inline-flex w-max items-center gap-1.5 rounded-md border px-2 py-0.5 font-mono text-[11px] font-medium tracking-wide">
        <i className="material-symbols-outlined" style={{ fontSize: "14px" }}>
            calendar_month
        </i>
        {timeframe}
    </span>
);

const RoleDetails = ({
    role,
    blogPosts,
}: {
    role: WorkRole;
    blogPosts: BlogPost[];
}) => {
    const relatedPosts = blogPosts.filter(
        (b) => b.relatedRole && b.relatedRole === role.id
    );

    return (
        <div className="flex flex-col gap-3">
            {/* Bullet point details */}
            {role.details && role.details.length > 0 && (
                <div className="flex flex-col gap-1.5">
                    {role.details.map((d) => (
                        <span key={d} className="flex gap-1">
                            <Icon
                                variant="highlight"
                                icon="chevron_right"
                                className="shrink-0 text-xs leading-5"
                            />
                            <Text variant="secondary" className="text-sm">
                                {d}
                            </Text>
                        </span>
                    ))}
                </div>
            )}
            {/* Technologies */}
            {role.technologies && role.technologies.length > 0 && (
                <span className="mt-1 flex flex-wrap gap-1">
                    {role.technologies.map((t) => (
                        <Skill key={t} skill={t} />
                    ))}
                </span>
            )}
            {/* Blog posts written about this role */}
            {relatedPosts.length > 0 && (
                <div className="mt-1 flex flex-col gap-1">
                    <Text
                        variant="secondary"
                        className="text-text-tertiary font-mono text-[11px] tracking-wide"
                    >
                        Related posts
                    </Text>
                    <div className="flex flex-col gap-0.5">
                        {relatedPosts.map((p) => (
                            <Link
                                key={p.slug}
                                to={`/blogs/${p.slug}`}
                                className="group hover:bg-card-bg-elevated -mx-2 flex w-fit max-w-full items-start gap-2 rounded px-2 py-1 transition-colors"
                            >
                                <Icon
                                    variant="highlight"
                                    icon="article_person"
                                    className="shrink-0 text-xs leading-5"
                                />
                                <Text
                                    variant="secondary"
                                    redirect
                                    className="text-sm"
                                >
                                    {p.title}
                                </Text>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

// Combined span across every role at the workplace, e.g. roles running
// "Jan 2025 - Aug 2026" and "Aug 2026 - Current" become "Jan 2025 - Current"
const combinedTimeframe = (roles: WorkRole[]): string => {
    const start = roles[roles.length - 1].timeframe.split(" - ")[0];
    const end = roles[0].timeframe.split(" - ").slice(-1)[0];
    return `${start} - ${end}`;
};

const WorkExperience = ({
    workplace: { workplace, workLogo, roles, isCurrent },
    blogPosts,
    isLast,
}: WorkExperienceProps) => {
    if (roles.length === 0) {
        return null;
    }

    const isMultiRole = roles.length > 1;

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
                        <Timeframe
                            timeframe={
                                isMultiRole
                                    ? combinedTimeframe(roles)
                                    : roles[0].timeframe
                            }
                        />
                        <Text variant="primary" className="font-semibold">
                            {workplace}
                        </Text>
                        {!isMultiRole && (
                            <Text variant="secondary" className="text-sm">
                                {roles[0].role}
                            </Text>
                        )}
                    </div>
                </div>
                {/* Single role: details sit directly under the workplace header */}
                {!isMultiRole && (
                    <div className="sm:ml-18">
                        <RoleDetails role={roles[0]} blogPosts={blogPosts} />
                    </div>
                )}
                {/* Multiple roles at the same workplace, most recent first */}
                {isMultiRole && (
                    <div className="flex flex-col gap-5 sm:ml-18">
                        {roles.map((r) => (
                            <div
                                key={r.id}
                                className="flex w-full flex-col gap-0.5"
                            >
                                <Text
                                    variant="primary"
                                    className="text-sm font-semibold"
                                >
                                    {r.role}
                                </Text>
                                <Text
                                    variant="secondary"
                                    className="text-text-tertiary mt-0.5 mb-1.5 font-mono text-[11px] tracking-wide"
                                >
                                    {r.timeframe}
                                </Text>
                                <RoleDetails role={r} blogPosts={blogPosts} />
                            </div>
                        ))}
                    </div>
                )}
            </Card>
        </div>
    );
};

export default WorkExperience;
