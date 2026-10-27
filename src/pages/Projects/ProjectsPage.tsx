import { useEffect, useState } from "react";
import Section from "../../components/Section/Section";
import type { BlogPost, Project, ProjectStatusType } from "../../data/models";
import usePageTitle from "../../hooks/usePageTitle";
import { loadAllBlogPosts, loadAllProjects } from "../../data/loader";
import Card from "../../components/Card/Card";
import { useNavigate } from "react-router-dom";
import Text from "../../components/Text/Text";
import Skill from "../../components/Skill/Skill";
import RedirectIcon from "../../components/Icon/RedirectIcon";
import RedirectLabel from "../../components/Icon/RedirectLabel";
import ProjectStatus from "../../components/ProjectStatus/ProjectStatus";
import RelatedPosts from "../../components/RelatedPosts/RelatedPosts";
import { twMerge } from "tailwind-merge";

const TIMELINE_DOT_CLASSES: Record<ProjectStatusType, string> = {
    finished: "bg-emerald-400",
    "in-progress": "bg-highlight animate-timeline-pulse",
    "on-hold": "bg-amber-400",
    discontinued: "bg-card-border-hover",
};

const ProjectsPage = () => {
    usePageTitle("Projects | Callum Burgoyne");
    const navigate = useNavigate();

    const [projects, setProjects] = useState<Project[]>([]);
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

    // load projects into state
    useEffect(() => {
        const loadProjects = async () => {
            const resp = await loadAllProjects();
            if (resp) {
                setProjects(resp);
            }
        };
        loadProjects();
    }, []);

    // load blog posts into state, to show those written about each project
    useEffect(() => {
        const loadBlogPosts = async () => {
            const resp = await loadAllBlogPosts();
            if (resp) {
                setBlogPosts(resp);
            }
        };
        loadBlogPosts();
    }, []);

    return (
        <main>
            <Section header="My Projects">
                {/* project timeline */}
                <div className="flex flex-col">
                    {projects.map((p, i) => {
                        const isLast = i === projects.length - 1;
                        return (
                            <div
                                key={p.slug}
                                className="relative flex gap-4 pb-6 last:pb-0 xl:-ml-[28px] xl:w-[calc(100%_+_28px)]"
                            >
                                {/* Rail (xl+) */}
                                <div className="relative hidden w-3 flex-shrink-0 xl:block">
                                    <span
                                        className={twMerge(
                                            "ring-page-bg absolute top-6 left-1/2 size-3 -translate-x-1/2 rounded-full ring-4",
                                            TIMELINE_DOT_CLASSES[p.status]
                                        )}
                                    ></span>
                                    {!isLast && (
                                        <span className="from-card-border-hover to-card-border absolute top-10 bottom-[-0.5rem] left-1/2 w-px -translate-x-1/2 bg-gradient-to-b"></span>
                                    )}
                                </div>
                                <Card
                                    className="flex w-full flex-col gap-0 p-0"
                                    onClick={() =>
                                        navigate(`/projects/${p.slug}`)
                                    }
                                >
                                    {/* Banner */}
                                    <div className="relative hidden aspect-[7/1] w-full overflow-hidden rounded-t-md sm:block">
                                        <img
                                            src={`/project_images/${p.slug}/banner.png`}
                                            className="size-full object-cover"
                                            loading="lazy"
                                        />
                                        <div className="from-card-bg/70 via-card-bg/20 absolute inset-0 bg-gradient-to-t to-transparent"></div>
                                    </div>
                                    {/* Body */}
                                    <div className="flex flex-col items-start justify-between gap-4 p-4 sm:flex-row sm:flex-wrap sm:gap-x-8">
                                        <div className="flex flex-col gap-3">
                                            {/* Status, Title and summary */}
                                            <div className="flex flex-col gap-1">
                                                <ProjectStatus
                                                    status={p.status}
                                                />
                                                <Text
                                                    variant="primary"
                                                    className="text-lg font-semibold"
                                                >
                                                    {p.title}
                                                </Text>
                                                <Text
                                                    variant="secondary"
                                                    className="text-sm"
                                                >
                                                    {p.summary}
                                                </Text>
                                            </div>
                                            {/* 3 main technologies */}
                                            <span className="flex flex-wrap gap-1">
                                                {p.technologies
                                                    .slice(0, 3)
                                                    .map((t) => (
                                                        <Skill
                                                            key={t}
                                                            skill={t}
                                                        />
                                                    ))}
                                            </span>
                                            {/* Blog posts written about this project */}
                                            <RelatedPosts
                                                posts={blogPosts.filter(
                                                    (b) =>
                                                        b.relatedProject &&
                                                        b.relatedProject ===
                                                            p.slug
                                                )}
                                            />
                                        </div>
                                        {/* Github and/or Live Link */}
                                        <span className="flex flex-wrap gap-2">
                                            {p.githubRepo && (
                                                <>
                                                    <RedirectIcon
                                                        type="devicon"
                                                        to={
                                                            "https://github.com/" +
                                                            p.githubRepo
                                                        }
                                                        icon="github-original"
                                                        newTab
                                                        hoverText="Github"
                                                        className="hidden sm:flex"
                                                    />
                                                    <RedirectLabel
                                                        type="devicon"
                                                        to={
                                                            "https://github.com/" +
                                                            p.githubRepo
                                                        }
                                                        icon="github-original"
                                                        label="Github"
                                                        newTab
                                                        className="sm:hidden"
                                                    />
                                                </>
                                            )}
                                            {p.liveURL && (
                                                <>
                                                    <RedirectIcon
                                                        type="material"
                                                        to={p.liveURL}
                                                        icon="link"
                                                        newTab
                                                        hoverText="Live Site"
                                                        className="hidden text-sm sm:flex"
                                                    />
                                                    <RedirectLabel
                                                        type="material"
                                                        to={p.liveURL}
                                                        icon="link"
                                                        label="Live Site"
                                                        newTab
                                                        className="sm:hidden"
                                                    />
                                                </>
                                            )}
                                        </span>
                                    </div>
                                </Card>
                            </div>
                        );
                    })}
                </div>
            </Section>
        </main>
    );
};

export default ProjectsPage;
