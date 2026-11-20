import { useNavigate } from "react-router-dom";
import type { BlogPost, Project, Workplace } from "../../data/models";
import Card from "../Card/Card";
import Text from "../Text/Text";
import RelatedLinks from "../RelatedLinks/RelatedLinks";
import {
    relatedProjectLink,
    relatedRoleLink,
} from "../RelatedLinks/blogPostRelations";

interface BlogPostCardProps {
    post: BlogPost;
    projects?: Project[]; // needed to show the related project's name
    workplaces?: Workplace[]; // needed to show the related role's name
    hideRelatedProject?: boolean; // hides the project link when already viewing that project
}

const BlogPostCard = ({
    post,
    projects = [],
    workplaces = [],
    hideRelatedProject,
}: BlogPostCardProps) => {
    const navigate = useNavigate();

    const projectLinks = hideRelatedProject
        ? []
        : relatedProjectLink(post, projects);
    const roleLinks = relatedRoleLink(post, workplaces);

    return (
        <Card
            className="flex w-full flex-col gap-0 p-0"
            onClick={() => navigate(`/blogs/${post.slug}`)}
        >
            {/* Banner */}
            <div className="relative hidden aspect-7/1 w-full overflow-hidden rounded-t-md sm:block">
                <img
                    src={`/blogs/${post.slug}/banner.png`}
                    alt=""
                    className="size-full object-cover transition-transform duration-700 ease-(--ease-out-soft) group-hover/card:scale-[1.03]"
                    loading="lazy"
                />
                <div className="from-card-bg/70 via-card-bg/20 absolute inset-0 bg-linear-to-t to-transparent"></div>
            </div>
            {/* Body */}
            <div className="flex flex-col items-start justify-between gap-4 p-4 sm:flex-row sm:flex-wrap sm:gap-x-8">
                <div className="flex w-full flex-col gap-3">
                    {/* Date, Title and summary */}
                    <div className="flex flex-col gap-1">
                        <Text
                            variant="secondary"
                            className="text-text-tertiary text-xs font-medium tabular-nums"
                        >
                            {post.date}
                        </Text>
                        <Text
                            as="h3"
                            variant="primary"
                            className="group-hover/card:text-highlight-soft text-lg font-semibold transition-colors duration-300"
                        >
                            {post.title}
                        </Text>
                        <Text variant="secondary" className="text-sm">
                            {post.summary}
                        </Text>
                    </div>
                    {/* What this post is about */}
                    <RelatedLinks
                        heading="Related project"
                        links={projectLinks}
                    />
                    <RelatedLinks heading="Related role" links={roleLinks} />
                </div>
            </div>
        </Card>
    );
};

export default BlogPostCard;
