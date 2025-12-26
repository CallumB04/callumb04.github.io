import { useParams } from "react-router-dom";

const ProjectPage = () => {
    const { slug } = useParams();

    // add page title when pulled project info
    // usePageTitle("<project name> | Callum Burgoyne")

    return <main>ProjectPage</main>;
};

export default ProjectPage;
