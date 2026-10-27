import type { BlogPost } from "../../data/models";
import RelatedLinks from "../RelatedLinks/RelatedLinks";

interface RelatedPostsProps {
    posts: BlogPost[];
}

// Blog posts written about a project, work role or certification
const RelatedPosts = ({ posts }: RelatedPostsProps) => (
    <RelatedLinks
        heading={`Related blog post${posts.length > 1 ? "s" : ""}`}
        links={posts.map((p) => ({
            icon: "article_person",
            label: p.title,
            to: `/blogs/${p.slug}`,
        }))}
    />
);

export default RelatedPosts;
