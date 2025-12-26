import { useParams } from "react-router-dom";

const BlogPostPage = () => {
    const { slug } = useParams();

    // add page title when pulled blog post info
    // usePageTitle("<blog post name> | Callum Burgoyne")

    return <main>BlogPostPage</main>;
};

export default BlogPostPage;
