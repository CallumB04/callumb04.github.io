import { useParams } from "react-router-dom";
import Section from "../../components/Section/Section";
import { useEffect, useState } from "react";
import type { BlogPost, Project, Workplace } from "../../data/models";
import {
    loadAllProjects,
    loadAllWorkplaces,
    loadBlogPostBySlug,
} from "../../data/loader";
import usePageTitle from "../../hooks/usePageTitle";
import Text from "../../components/Text/Text";
import RelatedLinks from "../../components/RelatedLinks/RelatedLinks";
import {
    relatedProjectLink,
    relatedRoleLink,
} from "../../components/RelatedLinks/blogPostRelations";
import BlogPostPageSection from "./components/BlogPostPageSection";
import BlogPostContents from "./components/BlogPostContents";
import useActiveSection from "../../hooks/useActiveSection";
import NotFoundPage from "../NotFound/NotFoundPage";

// function to convert blog post section title to slug for element ID
const sectionTitleToSlug = (title: string) =>
    title.replaceAll(" ", "-").replaceAll("?", "").toLowerCase();

const BlogPostPage = () => {
    // get blog post slug from url to load data
    const { slug } = useParams();

    const [blogPost, setBlogPost] = useState<BlogPost | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // loaded to resolve the names of what this post relates to
    const [projects, setProjects] = useState<Project[]>([]);
    const [workplaces, setWorkplaces] = useState<Workplace[]>([]);

    // load blogPost data into state
    useEffect(() => {
        const loadBlogPostData = async () => {
            if (slug) {
                const resp = await loadBlogPostBySlug(slug);
                if (resp) {
                    setBlogPost(resp);
                }
                setIsLoading(false);
            }
        };

        loadBlogPostData();
    }, [slug]);

    // load the data needed to name this post's related project and role
    useEffect(() => {
        const loadRelationNames = async () => {
            setProjects(await loadAllProjects());
            setWorkplaces(await loadAllWorkplaces());
        };

        loadRelationNames();
    }, []);

    const contentsItems = (blogPost?.sections ?? [])
        .filter((s) => s.textFile)
        .map((s) => ({ id: sectionTitleToSlug(s.title), title: s.title }));

    const activeId = useActiveSection(contentsItems.map((i) => i.id));

    usePageTitle(
        blogPost?.title
            ? blogPost.title + " | Callum Burgoyne"
            : "Page not found"
    );

    if (!isLoading && !blogPost) {
        return <NotFoundPage />;
    }

    const projectLinks = blogPost ? relatedProjectLink(blogPost, projects) : [];
    const roleLinks = blogPost ? relatedRoleLink(blogPost, workplaces) : [];

    return (
        <main>
            <Section header="Blog Post">
                {/* Title and date */}
                <div className="flex flex-col gap-2">
                    <Text
                        variant="secondary"
                        className="text-text-tertiary font-mono text-[11px] tracking-wide sm:text-[13px]"
                    >
                        {blogPost?.date}
                    </Text>
                    <Text
                        variant="primary"
                        className="text-4xl leading-tight font-semibold sm:text-5xl"
                    >
                        <span className="text-highlight">
                            {blogPost?.title}
                        </span>
                    </Text>
                </div>
                {/* What this post is about */}
                <div className="flex flex-col gap-2">
                    <RelatedLinks
                        heading="Related project"
                        links={projectLinks}
                    />
                    <RelatedLinks heading="Related role" links={roleLinks} />
                </div>
                <BlogPostContents
                    items={contentsItems}
                    activeId={activeId}
                    variant="block"
                />
                {/* the post keeps the full page width - contents lives in the
                    page margin beside it, where it costs the content nothing */}
                <div className="relative flex flex-col gap-6">
                    {blogPost?.sections.map((s) => (
                        <BlogPostPageSection
                            key={s.title}
                            section={s}
                            blogSlug={slug}
                            id={sectionTitleToSlug(s.title)}
                        />
                    ))}
                    <BlogPostContents
                        items={contentsItems}
                        activeId={activeId}
                        variant="gutter"
                    />
                </div>
            </Section>
        </main>
    );
};

export default BlogPostPage;
