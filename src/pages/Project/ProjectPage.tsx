import { useParams } from "react-router-dom";
import Section from "../../components/Section/Section";
import { useEffect, useState } from "react";
import type { Project } from "../../data/models";
import { loadProjectBySlug } from "../../data/loader";
import usePageTitle from "../../hooks/usePageTitle";

const ProjectPage = () => {
    // get project slug from url to load data
    const { slug } = useParams();

    const [project, setProject] = useState<Project | undefined>(undefined);

    // load project data into state
    useEffect(() => {
        const loadProjectData = async () => {
            if (slug) {
                const resp = await loadProjectBySlug(slug);
                if (resp) {
                    setProject(resp);
                }
            }
        };

        loadProjectData();
    }, [slug]);

    usePageTitle(project?.title + " | Callum Burgoyne");

    return (
        <main>
            <Section header="Project Info"></Section>
            <Section header="Project Images"></Section>
        </main>
    );
};

export default ProjectPage;
