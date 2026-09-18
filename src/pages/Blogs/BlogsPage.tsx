import { useEffect, useState } from "react";
import Section from "../../components/Section/Section";
import type { BlogPost } from "../../data/models";
import usePageTitle from "../../hooks/usePageTitle";
import { loadAllBlogPosts } from "../../data/loader";
import BlogPostCard from "../../components/BlogPostCard/BlogPostCard";

const BlogsPage = () => {
    usePageTitle("Blogs | Callum Burgoyne");

    const [blogs, setBlogs] = useState<BlogPost[]>([]);

    // load blogs into state
    useEffect(() => {
        const loadBlogs = async () => {
            const resp = await loadAllBlogPosts();
            if (resp) {
                setBlogs(resp);
            }
        };
        loadBlogs();
    }, []);

    return (
        <main>
            <Section header="My Blogs">
                {/* list of blogs */}
                <div className="flex flex-col gap-3">
                    {blogs.map((b) => (
                        <BlogPostCard key={b.slug} post={b} />
                    ))}
                </div>
            </Section>
        </main>
    );
};

export default BlogsPage;
