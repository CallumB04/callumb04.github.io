import { useParams } from "react-router-dom";
import Section from "../../components/Section/Section";
import { useEffect, useState } from "react";
import type { BlogPost, Project, Workplace } from "../../data/models";
import {
    loadAllBlogPosts,
    loadAllWorkplaces,
    loadProjectBySlug,
} from "../../data/loader";
import usePageTitle from "../../hooks/usePageTitle";
import Text from "../../components/Text/Text";
import Skill from "../../components/Skill/Skill";
import RedirectLabel from "../../components/Icon/RedirectLabel";
import ProjectStatus from "../../components/ProjectStatus/ProjectStatus";
import { twMerge } from "tailwind-merge";
import NotFoundPage from "../NotFound/NotFoundPage";
import BlogPostCard from "../../components/BlogPostCard/BlogPostCard";

const ProjectPage = () => {
    // get project slug from url to load data
    const { slug } = useParams();

    const [project, setProject] = useState<Project | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [selectedImage, setSelectedImage] = useState<string>("");

    // blog posts written about this project
    const [relatedBlogs, setRelatedBlogs] = useState<BlogPost[]>([]);

    // loaded to resolve the names of roles those posts relate to
    const [workplaces, setWorkplaces] = useState<Workplace[]>([]);

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

    // load blog posts related to this project into state
    useEffect(() => {
        const loadRelatedBlogs = async () => {
            const resp = await loadAllBlogPosts();
            setRelatedBlogs(
                resp.filter(
                    (b) => b.relatedProject && b.relatedProject === slug
                )
            );
        };

        loadRelatedBlogs();
    }, [slug]);

    // load the data needed to name the roles those posts relate to
    useEffect(() => {
        const loadRelationNames = async () => {
            setWorkplaces(await loadAllWorkplaces());
        };

        loadRelationNames();
    }, []);

    const images = project?.images ?? [];
    const selectedIndex = Math.max(0, images.indexOf(selectedImage));
    const showImage = (index: number) =>
        setSelectedImage(images[(index + images.length) % images.length]);

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
                        <span className="text-highlight">{project?.title}</span>
                    </Text>
                    {/* Status */}
                    <span className="flex flex-wrap items-center gap-2">
                        {project && (
                            <ProjectStatus status={project.status} size="md" />
                        )}
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
                                label="Live Site"
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
                                src={
                                    "/project_images/" +
                                    project.slug +
                                    "/" +
                                    img
                                }
                                className="border-card-border w-full rounded-md border"
                            />
                        </a>
                    ))}
                </div>
                {/* Desktop: the selected image, stepped through with the arrows */}
                <div className="group relative hidden sm:block">
                    <a
                        href={
                            "/project_images/" +
                            project?.slug +
                            "/" +
                            selectedImage
                        }
                        target="_blank"
                        className="block"
                    >
                        <img
                            src={
                                "/project_images/" +
                                project?.slug +
                                "/" +
                                selectedImage
                            }
                            className="border-card-border mx-auto block max-h-[70vh] w-auto max-w-full rounded-lg border shadow-xl shadow-black/40"
                        />
                    </a>
                    {images.length > 1 && (
                        <>
                            <button
                                type="button"
                                onClick={() => showImage(selectedIndex - 1)}
                                aria-label="Previous image"
                                className={twMerge(
                                    "bg-card-bg/70 text-text-primary hover:bg-card-bg hover:text-highlight border-card-border absolute top-1/2 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border backdrop-blur transition-colors duration-200",
                                    "left-4"
                                )}
                            >
                                <i className="material-symbols-outlined text-xs">
                                    chevron_left
                                </i>
                            </button>
                            <button
                                type="button"
                                onClick={() => showImage(selectedIndex + 1)}
                                aria-label="Next image"
                                className={twMerge(
                                    "bg-card-bg/70 text-text-primary hover:bg-card-bg hover:text-highlight border-card-border absolute top-1/2 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border backdrop-blur transition-colors duration-200",
                                    "right-4"
                                )}
                            >
                                <i className="material-symbols-outlined text-xs">
                                    chevron_right
                                </i>
                            </button>
                            <span className="bg-card-bg/70 text-text-primary border-card-border absolute right-4 bottom-4 rounded-md border px-2 py-0.5 font-mono text-[11px] tracking-wide backdrop-blur">
                                {selectedIndex + 1} of {images.length}
                            </span>
                        </>
                    )}
                </div>
            </Section>
            {/* Blog posts written about this project, hidden when there are none */}
            {relatedBlogs.length > 0 && (
                <Section
                    header="Blog Posts"
                    redirect={{ text: "View all", to: "/blogs" }}
                >
                    <div className="flex flex-col gap-3">
                        {relatedBlogs.map((b) => (
                            <BlogPostCard
                                key={b.slug}
                                post={b}
                                workplaces={workplaces}
                                hideRelatedProject
                            />
                        ))}
                    </div>
                </Section>
            )}
        </main>
    );
};

export default ProjectPage;
