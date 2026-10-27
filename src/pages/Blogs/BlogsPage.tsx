import { useEffect, useState } from "react";
import Section from "../../components/Section/Section";
import type { BlogPost, Project, Workplace } from "../../data/models";
import usePageTitle from "../../hooks/usePageTitle";
import {
    loadAllBlogPosts,
    loadAllProjects,
    loadAllWorkplaces,
} from "../../data/loader";
import BlogPostCard from "../../components/BlogPostCard/BlogPostCard";

const BlogsPage = () => {
    usePageTitle("Blogs | Callum Burgoyne");

    const [blogs, setBlogs] = useState<BlogPost[]>([]);

    // loaded to resolve the names of what each post relates to
    const [projects, setProjects] = useState<Project[]>([]);
    const [workplaces, setWorkplaces] = useState<Workplace[]>([]);

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

    // load the data needed to name each post's related project and role
    useEffect(() => {
        const loadRelationNames = async () => {
            setProjects(await loadAllProjects());
            setWorkplaces(await loadAllWorkplaces());
        };
        loadRelationNames();
    }, []);

    return (
        <main>
            <Section header="My Blogs">
                {/* list of blogs */}
                <div className="flex flex-col gap-3">
                    {blogs.map((b) => (
                        <BlogPostCard
                            key={b.slug}
                            post={b}
                            projects={projects}
                            workplaces={workplaces}
                        />
                    ))}
                </div>
            </Section>
        </main>
    );
};

export default BlogsPage;
