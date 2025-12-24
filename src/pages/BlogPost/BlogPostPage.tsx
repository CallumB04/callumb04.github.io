import { useParams } from "react-router-dom";

const BlogPostPage = () => {
    const { slug } = useParams();

    // add page title when pulled blog post info
    // usePageTitle("Callum Burgoyne - <blog post name>")

    return <main>BlogPostPage</main>;
};

export default BlogPostPage;
