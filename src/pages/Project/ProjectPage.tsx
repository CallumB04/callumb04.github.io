import { useParams } from "react-router-dom";

const ProjectPage = () => {
    const { slug } = useParams();

    // add page title when pulled project info
    // usePageTitle("Callum Burgoyne - <project name>")

    return <main>ProjectPage</main>;
};

export default ProjectPage;
