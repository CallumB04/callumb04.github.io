import { useParams } from "react-router-dom";
import Section from "../../components/Section/Section";
import { useEffect, useState } from "react";
import type { BlogPost } from "../../data/models";
import { loadBlogPostBySlug } from "../../data/loader";
import usePageTitle from "../../hooks/usePageTitle";
import Text from "../../components/Text/Text";
import RedirectIcon from "../../components/Icon/RedirectIcon";
import BlogPostPageSection from "./components/BlogPostPageSection";
import Card from "../../components/Card/Card";
import Divider from "../../components/Divider/Divider";

// function to convert blog post section title to slug for element ID
const sectionTitleToSlug = (title: string) =>
    title.replaceAll(" ", "-").replaceAll("?", "").toLowerCase();

const BlogPostPage = () => {
    // get blog post slug from url to load data
    const { slug } = useParams();

    const [blogPost, setBlogPost] = useState<BlogPost | undefined>(undefined);

    // load blogPost data into state
    useEffect(() => {
        const loadBlogPostData = async () => {
            if (slug) {
                const resp = await loadBlogPostBySlug(slug);
                if (resp) {
                    setBlogPost(resp);
                }
            }
        };

        loadBlogPostData();
    }, [slug]);

    usePageTitle(blogPost?.title + " | Callum Burgoyne");

    return (
        <main>
            <Section header="Blog Post">
                {/* Title and date */}
                <div className="flex flex-col gap-2">
                    <Text
                        variant="highlight"
                        className="text-4xl font-medium sm:text-5xl"
                    >
                        {blogPost?.title}
                    </Text>
                    <Text variant="secondary" className="text-xs sm:text-sm">
                        {blogPost?.date}
                    </Text>
                </div>
                {/* Related Project */}
                {blogPost?.relatedProject && (
                    <RedirectIcon
                        type="material"
                        to={"/projects/" + blogPost.relatedProject}
                        icon="folder_open"
                        hoverText="Related Project"
                        className="h-11 sm:w-11"
                        iconClassName="text-[26px]"
                    />
                )}
                {/* Contents */}
                <Card className="flex w-full flex-col gap-2">
                    <Text variant="primary" className="font-medium">
                        Contents
                    </Text>
                    <div className="flex flex-col gap-1">
                        {blogPost?.sections
                            .filter((s) => s.textFile)
                            .map((s, i) => (
                                <a
                                    href={"#" + sectionTitleToSlug(s.title)}
                                    className="group w-max"
                                >
                                    <Text
                                        variant="secondary"
                                        redirect
                                        className="text-sm font-light"
                                    >
                                        {i + 1} - {s.title}
                                    </Text>
                                </a>
                            ))}
                    </div>
                </Card>
                {/* Blog Post Sections */}
                <div className="flex flex-col gap-6">
                    {blogPost?.sections.map((s) => (
                        <BlogPostPageSection
                            key={s.title}
                            section={s}
                            blogSlug={slug}
                            id={sectionTitleToSlug(s.title)}
                        />
                    ))}
                </div>
            </Section>
        </main>
    );
};

export default BlogPostPage;
