import { useParams } from "react-router-dom";
import Section from "../../components/Section/Section";
import { useEffect, useState } from "react";
import type { BlogPost } from "../../data/models";
import { loadBlogPostBySlug } from "../../data/loader";
import usePageTitle from "../../hooks/usePageTitle";
import Text from "../../components/Text/Text";
import RedirectLabel from "../../components/Icon/RedirectLabel";
import BlogPostPageSection from "./components/BlogPostPageSection";
import Card from "../../components/Card/Card";
import NotFoundPage from "../NotFound/NotFoundPage";

// function to convert blog post section title to slug for element ID
const sectionTitleToSlug = (title: string) =>
    title.replaceAll(" ", "-").replaceAll("?", "").toLowerCase();

const BlogPostPage = () => {
    // get blog post slug from url to load data
    const { slug } = useParams();

    const [blogPost, setBlogPost] = useState<BlogPost | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(true);

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

    usePageTitle(
        blogPost?.title
            ? blogPost.title + " | Callum Burgoyne"
            : "Page not found"
    );

    if (!isLoading && !blogPost) {
        return <NotFoundPage />;
    }

    return (
        <main>
            <Section header="Blog Post">
                {/* Title and date */}
                <div className="flex flex-col gap-2">
                    <Text
                        variant="primary"
                        className="text-4xl leading-tight font-semibold sm:text-5xl"
                    >
                        <span className="text-highlight">
                            {blogPost?.title}
                        </span>
                    </Text>
                    <span className="bg-card-bg-elevated text-text-tertiary border-card-border inline-flex w-max items-center gap-1.5 rounded-md border px-2 py-0.5 font-mono text-[11px] font-medium tracking-wide sm:gap-2 sm:px-2.5 sm:py-1 sm:text-[13px]">
                        <i
                            className="material-symbols-outlined"
                            style={{ fontSize: "14px" }}
                        >
                            calendar_month
                        </i>
                        {blogPost?.date}
                    </span>
                </div>
                {/* Related Project */}
                {blogPost?.relatedProject && (
                    <RedirectLabel
                        type="material"
                        to={"/projects/" + blogPost.relatedProject}
                        icon="folder_open"
                        label="Related Project"
                        className="w-max"
                    />
                )}
                {/* Layout: TOC + content */}
                <div className="grid gap-8 lg:grid-cols-[1fr_220px]">
                    {/* Main column */}
                    <div className="flex min-w-0 flex-col gap-6 lg:order-first">
                        {blogPost?.sections.map((s) => (
                            <BlogPostPageSection
                                key={s.title}
                                section={s}
                                blogSlug={slug}
                                id={sectionTitleToSlug(s.title)}
                            />
                        ))}
                    </div>
                    {/* TOC */}
                    <aside className="order-first lg:order-last">
                        <Card
                            className="flex w-full flex-col gap-3 lg:sticky lg:mt-8"
                            style={{
                                top: "calc(var(--navbar-height) + 1.5rem)",
                            }}
                        >
                            <Text
                                variant="primary"
                                className="text-xs font-semibold tracking-[0.2em] uppercase sm:text-sm"
                            >
                                <span className="text-highlight">#</span> Contents
                            </Text>
                            <div className="flex flex-col gap-0.5">
                                {blogPost?.sections
                                    .filter((s) => s.textFile)
                                    .map((s, i) => (
                                        <a
                                            key={s.title}
                                            href={
                                                "#" +
                                                sectionTitleToSlug(s.title)
                                            }
                                            className="group hover:bg-card-bg-elevated flex items-baseline gap-2 rounded px-2 py-1.5 transition-colors"
                                        >
                                            <Text
                                                variant="secondary"
                                                className="text-text-tertiary group-hover:text-highlight font-mono text-xs transition-colors"
                                            >
                                                {String(i + 1).padStart(
                                                    2,
                                                    "0"
                                                )}
                                            </Text>
                                            <Text
                                                variant="secondary"
                                                redirect
                                                className="text-sm"
                                            >
                                                {s.title}
                                            </Text>
                                        </a>
                                    ))}
                            </div>
                        </Card>
                    </aside>
                </div>
            </Section>
        </main>
    );
};

export default BlogPostPage;
