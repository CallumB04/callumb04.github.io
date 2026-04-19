import { useEffect, useState } from "react";
import Section from "../../components/Section/Section";
import type { BlogPost } from "../../data/models";
import usePageTitle from "../../hooks/usePageTitle";
import { loadAllBlogPosts } from "../../data/loader";
import Card from "../../components/Card/Card";
import { useNavigate } from "react-router-dom";
import Text from "../../components/Text/Text";
import RedirectIcon from "../../components/Icon/RedirectIcon";
import RedirectLabel from "../../components/Icon/RedirectLabel";

const BlogsPage = () => {
    usePageTitle("Blogs | Callum Burgoyne");
    const navigate = useNavigate();

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
                        <Card
                            key={b.slug}
                            className="flex w-full flex-col gap-0 overflow-hidden p-0"
                            onClick={() => navigate(`/blogs/${b.slug}`)}
                        >
                            {/* Banner */}
                            <div className="relative hidden aspect-[7/1] w-full overflow-hidden sm:block">
                                <img
                                    src={`/blogs/${b.slug}/banner.png`}
                                    className="size-full object-cover"
                                    loading="lazy"
                                />
                                <div className="from-card-bg via-card-bg/40 absolute inset-0 bg-gradient-to-t to-transparent"></div>
                            </div>
                            {/* Body */}
                            <div className="flex flex-col items-start justify-between gap-4 p-4 sm:flex-row sm:flex-wrap sm:gap-x-8">
                                {/* Date, Title and summary */}
                                <div className="flex flex-col gap-1">
                                    <span className="bg-card-bg-elevated text-text-tertiary border-card-border inline-flex w-max items-center gap-1.5 rounded-md border px-2 py-0.5 font-mono text-[11px] font-medium tracking-wide">
                                        <i
                                            className="material-symbols-outlined"
                                            style={{ fontSize: "14px" }}
                                        >
                                            calendar_month
                                        </i>
                                        {b.date}
                                    </span>
                                    <Text
                                        variant="primary"
                                        className="text-lg font-semibold"
                                    >
                                        {b.title}
                                    </Text>
                                    <Text
                                        variant="secondary"
                                        className="text-sm"
                                    >
                                        {b.summary}
                                    </Text>
                                </div>
                                {/* Related Project */}
                                <span className="flex flex-wrap gap-2">
                                    {b.relatedProject && (
                                        <>
                                            <RedirectIcon
                                                type="material"
                                                to={
                                                    "/projects/" +
                                                    b.relatedProject
                                                }
                                                icon="folder_open"
                                                hoverText="Related Project"
                                                className="hidden sm:flex"
                                            />
                                            <RedirectLabel
                                                type="material"
                                                to={
                                                    "/projects/" +
                                                    b.relatedProject
                                                }
                                                icon="folder_open"
                                                label="Related Project"
                                                className="sm:hidden"
                                            />
                                        </>
                                    )}
                                </span>
                            </div>
                        </Card>
                    ))}
                </div>
            </Section>
        </main>
    );
};

export default BlogsPage;
