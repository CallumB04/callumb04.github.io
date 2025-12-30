import { useParams } from "react-router-dom";
import Section from "../../components/Section/Section";
import { useEffect, useState } from "react";
import type { Project } from "../../data/models";
import { loadProjectBySlug } from "../../data/loader";
import usePageTitle from "../../hooks/usePageTitle";
import Text from "../../components/Text/Text";
import Skill from "../../components/Skill/Skill";
import RedirectIcon from "../../components/Icon/RedirectIcon";
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
        <main>
            <Section header="Project Info">
                <div className="flex flex-col gap-2">
                    {/* Title */}
                    <Text
                        variant="highlight"
                        className="text-4xl font-medium sm:text-5xl"
                    >
                        {project?.title}
                    </Text>
                    {/* Start and/or Finish date */}
                    <Text variant="secondary" className="text-xs sm:text-sm">
                        {shortenDate(project?.startDate) ?? "???"}
                        {shortenDate(project?.startDate) ===
                        shortenDate(project?.finishDate)
                            ? ""
                            : shortenDate(project?.finishDate)
                              ? " - " + shortenDate(project?.finishDate)
                              : " - ???"}
                    </Text>
                </div>
                {/* Project Details */}
                <div className="flex flex-col gap-4">
                    {/* Technologies */}
                    <span className="flex flex-wrap gap-1">
                        {project?.technologies.map((t) => (
                            <Skill key={t} skill={t} />
                        ))}
                    </span>
                    {/* Description */}
                    <Text
                        variant="secondary"
                        className="text-justify text-xs sm:text-sm"
                    >
                        {project?.longDescription}
                    </Text>
                    {/* Github and/or Live Link */}
                    <span className="flex gap-2">
                        {project?.githubRepo && (
                            <RedirectIcon
                                type="devicon"
                                to={"https://github.com/" + project.githubRepo}
                                icon="github-original"
                                newTab
                                hoverText="Github"
                                className="size-11"
                                iconClassName="text-[26px]"
                            />
                        )}
                        {project?.liveURL && (
                            <RedirectIcon
                                type="material"
                                to={project.liveURL}
                                icon="link"
                                newTab
                                hoverText="Live Demo"
                                className="size-11"
                                iconClassName="text-[26px]"
                            />
                        )}
                    </span>
                </div>
            </Section>
            <Section header="Project Images">
                <div className="flex gap-4">
                    {/* Image previews */}
                    <div className="flex w-full flex-col gap-2 sm:w-24">
                        {project?.images.map((img) => (
                            <div
                                key={img}
                                className={twMerge(
                                    "size-full cursor-pointer rounded p-1 transition-colors duration-200 sm:size-24 sm:border-2",
                                    selectedImage === img
                                        ? "sm:border-highlight-soft"
                                        : "sm:border-[#272727] sm:hover:border-[#444]"
                                )}
                                onClick={() => setSelectedImage(img)}
                            >
                                <img
                                    src={
                                        "/project_images/" +
                                        project.slug +
                                        "/" +
                                        img
                                    }
                                    className="size-full rounded object-cover sm:rounded-none"
                                />
                            </div>
                        ))}
                    </div>
                    {/* Selected image */}
                    <a
                        href={
                            "/project_images/" +
                            project?.slug +
                            "/" +
                            selectedImage
                        }
                        target="_blank"
                        className="hidden sm:block"
                    >
                        <img
                            src={
                                "/project_images/" +
                                project?.slug +
                                "/" +
                                selectedImage
                            }
                            className="h-max w-full rounded"
                        />
                    </a>
                </div>
            </Section>
        </main>
    );
};

export default ProjectPage;
