import { useParams } from "react-router-dom";
import Section from "../../components/Section/Section";
import { useEffect, useState } from "react";
import type { BlogPost } from "../../data/models";
import { loadBlogPostBySlug } from "../../data/loader";
import usePageTitle from "../../hooks/usePageTitle";
import Text from "../../components/Text/Text";
import RedirectIcon from "../../components/Icon/RedirectIcon";

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
                {/* Blog Post Sections */}
                <div className="flex flex-col gap-4">
                    {/* TODO: Add sections */}
                </div>
            </Section>
        </main>
    );
};

export default BlogPostPage;
