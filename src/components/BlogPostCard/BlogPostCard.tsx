import { useNavigate } from "react-router-dom";
import type { BlogPost } from "../../data/models";
import Card from "../Card/Card";
import Text from "../Text/Text";
import RedirectIcon from "../Icon/RedirectIcon";
import RedirectLabel from "../Icon/RedirectLabel";

interface BlogPostCardProps {
    post: BlogPost;
    hideRelatedProject?: boolean; // hides the project pill when already viewing that project
}

const BlogPostCard = ({ post, hideRelatedProject }: BlogPostCardProps) => {
    const navigate = useNavigate();

    const showRelatedProject =
        Boolean(post.relatedProject) && !hideRelatedProject;
    const showRelatedRole = Boolean(post.relatedRole);

    return (
        <Card
            className="flex w-full flex-col gap-0 p-0"
            onClick={() => navigate(`/blogs/${post.slug}`)}
        >
            {/* Banner */}
            <div className="relative hidden aspect-7/1 w-full overflow-hidden rounded-t-md sm:block">
                <img
                    src={`/blogs/${post.slug}/banner.png`}
                    className="size-full object-cover"
                    loading="lazy"
                />
                <div className="from-card-bg/70 via-card-bg/20 absolute inset-0 bg-linear-to-t to-transparent"></div>
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
                        {post.date}
                    </span>
                    <Text variant="primary" className="text-lg font-semibold">
                        {post.title}
                    </Text>
                    <Text variant="secondary" className="text-sm">
                        {post.summary}
                    </Text>
                </div>
                {/* Related Project + Role */}
                {(showRelatedProject || showRelatedRole) && (
                    <span className="flex flex-wrap gap-2">
                        {showRelatedProject && (
                            <>
                                <RedirectIcon
                                    type="material"
                                    to={"/projects/" + post.relatedProject}
                                    icon="folder_open"
                                    hoverText="Related Project"
                                    className="hidden sm:flex"
                                />
                                <RedirectLabel
                                    type="material"
                                    to={"/projects/" + post.relatedProject}
                                    icon="folder_open"
                                    label="Related Project"
                                    className="sm:hidden"
                                />
                            </>
                        )}
                        {showRelatedRole && (
                            <>
                                <RedirectIcon
                                    type="material"
                                    to="/#work"
                                    icon="work"
                                    hoverText="Related Role"
                                    className="hidden sm:flex"
                                />
                                <RedirectLabel
                                    type="material"
                                    to="/#work"
                                    icon="work"
                                    label="Related Role"
                                    className="sm:hidden"
                                />
                            </>
                        )}
                    </span>
                )}
            </div>
        </Card>
    );
};

export default BlogPostCard;
