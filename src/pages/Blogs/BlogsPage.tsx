import { useEffect, useState } from "react";
import Section from "../../components/Section/Section";
import type { BlogPost } from "../../data/models";
import usePageTitle from "../../hooks/usePageTitle";
import { loadAllBlogPosts } from "../../data/loader";
import Card from "../../components/Card/Card";
import { useNavigate } from "react-router-dom";
import Text from "../../components/Text/Text";
import RedirectIcon from "../../components/Icon/RedirectIcon";

// function to shorten start/finish date for card preview
export const shortenDate = (date: string | undefined) => {
    if (date) {
        const dateArr = date.split(" ");
        return dateArr[1].slice(0, 3) + " " + dateArr[2];
    }
};

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
                <div className="flex flex-col gap-2">
                    {blogs.map((b) => (
                        <Card
                            key={b.slug}
                            className="flex w-full flex-wrap items-start justify-between gap-x-8 gap-y-4"
                            onClick={() => navigate(`/blogs/${b.slug}`)}
                        >
                            {/* Blog Image */}
                            <img
                                src={`/blogs/${b.slug}/banner.png`}
                                className="aspect-7/1 w-full rounded object-cover"
                            />
                            {/* Date, Title and summary */}
                            <div className="flex flex-col gap-1">
                                <Text variant="secondary" className="text-xs">
                                    {shortenDate(b.date)}
                                </Text>
                                <Text
                                    variant="primary"
                                    className="font-semibold"
                                >
                                    {b.title}
                                </Text>
                                <Text variant="secondary" className="text-sm">
                                    {b.summary}
                                </Text>
                            </div>
                            {/* Github and/or Live Link */}
                            <span className="flex gap-2">
                                {b.relatedProject && (
                                    <RedirectIcon
                                        type="material"
                                        to={"/projects/" + b.relatedProject}
                                        icon="folder_open"
                                        hoverText="Related Project"
                                    />
                                )}
                            </span>
                        </Card>
                    ))}
                </div>
            </Section>
        </main>
    );
};

export default BlogsPage;
