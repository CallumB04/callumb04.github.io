import "./ProjectPage.css";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "./Navbar/Navbar";

const ProjectPage = ({ projects }) => {
    const { projectName } = useParams(); // get projectName from URL
    const project = projects[projectName]; // accessing project data from projects object

    // ensure project page opens at top
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Displaying if user attemps to access non-existing project
    if (!project) {
        return (
            <>
                <Navbar />
                <h2 className="project-not-found">Project not found</h2>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <main className="main project-page">
                <aside className="project-page-sidebar">
                    <h2 className="project-page-sidebar-title">My Projects</h2>
                    {Object.keys(projects).map((projectKey) => {
                        let proj = projects[projectKey];
                        return (
                            <Link
                                key={projectKey}
                                to={`/projects/${projectKey}`}
                                active={project === proj ? "true" : "false"}
                            >
                                {proj.title}
                            </Link>
                        );
                    })}
                </aside>
                <div className="project-content">
                    <h1 className="project-page-title">{project.title}</h1>

                    <div className="project-page-links">
                        <a
                            href={project.githubRepo}
                            target="_blank"
                            className="fab fa-github"
                        ></a>
                        {/* displaying link to demo website if exists*/}
                        {project.liveWebsite ? (
                            <a
                                href={project.liveWebsite}
                                target="_blank"
                                className="fa fa-link"
                            ></a>
                        ) : (
                            ""
                        )}
                    </div>

                    <h2 className="project-page-subtitle">Technologies</h2>
                    <div className="project-page-technologies">
                        {project.allTechnologies.map((item) => {
                            return (
                                <p
                                    key={item}
                                    className="project-page-technology"
                                >
                                    {item}
                                </p>
                            );
                        })}
                    </div>

                    <h2 className="project-page-subtitle">About the Project</h2>
                    {/* Currently shows description, add long about property to each project in object */}
                    <p className="project-page-about">{project.longAbout}</p>

                    <h2
                        className="project-page-subtitle"
                        id="project-images-subtitle"
                    >
                        Project Images
                    </h2>
                    <div className="project-page-images">
                        {project.images.map((image) => {
                            let imagePath = `/assets/project-images/${projectName}/${image}`;
                            return (
                                <a
                                    href={imagePath}
                                    target="_blank"
                                    className="project-page-image"
                                    key={imagePath}
                                >
                                    <img
                                        key={image}
                                        src={`/assets/project-images/${projectName}/${image}`}
                                    />
                                </a>
                            );
                        })}
                    </div>
                </div>
            </main>
        </>
    );
};

export default ProjectPage;
