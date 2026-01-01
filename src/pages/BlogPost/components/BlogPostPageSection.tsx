import { useEffect, useState } from "react";
import type { BlogPostSection } from "../../../data/models";
import { loadBlogPostMarkdown } from "../../../data/loader";
import { marked } from "marked";
import Text from "../../../components/Text/Text";

interface BlogPostPageSectionProps {
    section: BlogPostSection;
    blogSlug: string | undefined;
    id: string;
}

const BlogPostPageSection = ({
    section,
    blogSlug,
    id,
}: BlogPostPageSectionProps) => {
    const [markdownText, setMarkdownText] = useState<string | Promise<string>>(
        ""
    );

    // parse markdown file
    useEffect(() => {
        const loadMarkdown = async () => {
            const markdown = await loadBlogPostMarkdown(
                "/blogs/" + blogSlug + "/text/" + section.textFile
            );

            const parsed = marked.parse(markdown);
            // ensuring all anchors go to new tab
            const content = parsed
                .toString()
                .replaceAll("<a", "<a target='_blank'");
            setMarkdownText(content);
        };

        loadMarkdown();
    }, [section]);

    // Image Section
    if (section.imageFile) {
        return (
            <div className="flex flex-col gap-1.5" id={id}>
                <a
                    href={"/blogs/" + blogSlug + "/images/" + section.imageFile}
                    target="_blank"
                >
                    <img
                        src={
                            "/blogs/" +
                            blogSlug +
                            "/images/" +
                            section.imageFile
                        }
                        className="w-full rounded"
                    />
                </a>
                <Text variant="secondary" className="text-right text-xs">
                    {section.title}
                </Text>
            </div>
        );
    }

    // Markdown Text Section
    return (
        <div
            dangerouslySetInnerHTML={{ __html: markdownText }}
            className="font-primary blog-post-markdown"
            id={id}
        ></div>
    );
};

export default BlogPostPageSection;
