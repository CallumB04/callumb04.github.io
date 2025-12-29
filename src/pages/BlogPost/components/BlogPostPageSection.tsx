import { useEffect, useState } from "react";
import type { BlogPostSection } from "../../../data/models";
import { loadBlogPostMarkdown } from "../../../data/loader";
import { marked } from "marked";

interface BlogPostPageSectionProps {
    section: BlogPostSection;
    blogSlug: string | undefined;
}

const BlogPostPageSection = ({
    section,
    blogSlug,
}: BlogPostPageSectionProps) => {
    const [markdownText, setMarkdownText] = useState<string | Promise<string>>(
        ""
    );

    // parse markdown file
    useEffect(() => {
        const loadMarkdown = async () => {
            const markdown = await loadBlogPostMarkdown(
                "/blogs/" + blogSlug + "/" + section.textFile
            );

            const parsed = marked.parse(markdown);
            setMarkdownText(parsed);
        };

        loadMarkdown();
    }, [section]);

    // Image Section
    if (section.imageFile) {
        return (
            <img
                src={"/blogs/" + blogSlug + "/" + section.imageFile}
                className="w-full rounded"
            />
        );
    }

    // Markdown Text Section
    return (
        <div
            dangerouslySetInnerHTML={{ __html: markdownText }}
            className="font-primary blog-post-markdown"
        ></div>
    );
};

export default BlogPostPageSection;
