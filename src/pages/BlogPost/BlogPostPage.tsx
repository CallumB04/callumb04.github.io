import { useParams } from "react-router-dom";

const BlogPostPage = () => {
    const { slug } = useParams();

    return <main>BlogPostPage</main>;
};

export default BlogPostPage;
