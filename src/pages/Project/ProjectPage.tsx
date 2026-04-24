import { useParams } from "react-router-dom";
import Section from "../../components/Section/Section";
import { useEffect, useState } from "react";
import type { Project } from "../../data/models";
import { loadProjectBySlug } from "../../data/loader";
import usePageTitle from "../../hooks/usePageTitle";
import Text from "../../components/Text/Text";
import Skill from "../../components/Skill/Skill";
import RedirectLabel from "../../components/Icon/RedirectLabel";
import ProjectStatus from "../../components/ProjectStatus/ProjectStatus";
import { shortenDate } from "../Projects/ProjectsPage";
import { twMerge } from "tailwind-merge";
import NotFoundPage from "../NotFound/NotFoundPage";

const ProjectPage = () => {
    // get project slug from url to load data
    const { slug } = useParams();

    const [project, setProject] = useState<Project | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [selectedImage, setSelectedImage] = useState<string>("");

    // load project data into state
    useEffect(() => {
        const loadProjectData = async () => {
            if (slug) {
                const resp = await loadProjectBySlug(slug);
                if (resp) {
                    setProject(resp);
                    setSelectedImage(resp.images[0]);
                }
                setIsLoading(false);
            }
        };

        loadProjectData();
    }, [slug]);

    usePageTitle(
        project?.title ? project.title + " | Callum Burgoyne" : "Page not found"
    );

    if (!isLoading && !project) {
        return <NotFoundPage />;
    }

    return (
        <main className="gap-10! sm:gap-12!">
            <Section header="Info">
                <div className="flex flex-col gap-2">
                    {/* Title */}
                    <Text
                        variant="primary"
                        className="text-4xl leading-tight font-semibold sm:text-5xl"
                    >
                        <span className="text-highlight">
                            {project?.title}
                        </span>
                    </Text>
                    {/* Status + Start/Finish date */}
                    <span className="flex flex-wrap items-center gap-2">
                        {project && (
                            <ProjectStatus
                                status={project.status}
                                size="md"
                            />
                        )}
                        <span className="bg-card-bg-elevated text-text-tertiary border-card-border inline-flex w-max items-center gap-1.5 rounded-md border px-2 py-0.5 font-mono text-[11px] font-medium tracking-wide sm:gap-2 sm:px-2.5 sm:py-1 sm:text-[13px]">
                            <i
                                className="material-symbols-outlined"
                                style={{ fontSize: "14px" }}
                            >
                                calendar_month
                            </i>
                            {shortenDate(project?.startDate) ?? "???"}
                            {shortenDate(project?.startDate) ===
                            shortenDate(project?.finishDate)
                                ? ""
                                : shortenDate(project?.finishDate)
                                  ? " — " + shortenDate(project?.finishDate)
                                  : " — ???"}
                        </span>
                    </span>
                </div>
                {/* Technologies + links */}
                <div className="flex flex-col gap-4">
                    <span className="flex flex-wrap gap-1">
                        {project?.technologies.map((t) => (
                            <Skill key={t} skill={t} />
                        ))}
                    </span>
                    <span className="flex flex-wrap gap-2">
                        {project?.githubRepo && (
                            <RedirectLabel
                                type="devicon"
                                to={"https://github.com/" + project.githubRepo}
                                icon="github-original"
                                label="View on Github"
                                newTab
                            />
                        )}
                        {project?.liveURL && (
                            <RedirectLabel
                                type="material"
                                to={project.liveURL}
                                icon="link"
                                label="Live Demo"
                                newTab
                            />
                        )}
                    </span>
                </div>
            </Section>
            <Section header="Overview">
                <div className="flex flex-col gap-3">
                    {project?.longDescription
                        .split("\n")
                        .map((paragraph, i) => (
                            <Text
                                key={i}
                                variant="secondary"
                                className="font-body text-[1.0625rem] leading-8 tracking-[0.01em] sm:text-[1.125rem] sm:leading-[1.85]"
                            >
                                {paragraph}
                            </Text>
                        ))}
                </div>
            </Section>
            <Section header="Images">
                {/* Mobile: all images stacked full-width */}
                <div className="flex flex-col gap-3 sm:hidden">
                    {project?.images.map((img) => (
                        <a
                            key={img}
                            href={"/project_images/" + project.slug + "/" + img}
                            target="_blank"
                        >
                            <img
                                src={"/project_images/" + project.slug + "/" + img}
                                className="border-card-border w-full rounded-md border"
                            />
                        </a>
                    ))}
                </div>
                {/* Desktop: sidebar thumbnails + selected image */}
                <div className="hidden gap-4 sm:flex">
                    <div className="flex w-24 flex-shrink-0 flex-col gap-3">
                        {project?.images.map((img) => (
                            <div
                                key={img}
                                className={twMerge(
                                    "ring-offset-page-bg size-24 cursor-pointer overflow-hidden rounded-md ring-2 ring-offset-2 transition-all duration-200",
                                    selectedImage === img
                                        ? "ring-highlight"
                                        : "ring-card-border hover:ring-card-border-hover"
                                )}
                                onClick={() => setSelectedImage(img)}
                            >
                                <img
                                    src={"/project_images/" + project.slug + "/" + img}
                                    className="size-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                    <a
                        href={"/project_images/" + project?.slug + "/" + selectedImage}
                        target="_blank"
                        className="h-max"
                    >
                        <img
                            src={"/project_images/" + project?.slug + "/" + selectedImage}
                            className="border-card-border block w-full rounded-lg border shadow-xl shadow-black/40"
                        />
                    </a>
                </div>
            </Section>
        </main>
    );
};

export default ProjectPage;
