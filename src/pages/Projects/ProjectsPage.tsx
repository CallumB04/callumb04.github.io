import { useEffect, useState } from "react";
import Section from "../../components/Section/Section";
import type { Project } from "../../data/models";
import usePageTitle from "../../hooks/usePageTitle";
import { loadAllProjects } from "../../data/loader";
import Card from "../../components/Card/Card";
import { useNavigate } from "react-router-dom";
import Text from "../../components/Text/Text";
import Skill from "../../components/Skill/Skill";
import RedirectIcon from "../../components/Icon/RedirectIcon";

// function to shorten start/finish date for card preview
const shortenDate = (date: string | undefined) => {
    if (date) {
        const dateArr = date.split(" ");
        return dateArr[1].slice(0, 3) + " " + dateArr[2];
    }
};

const ProjectsPage = () => {
    usePageTitle("Callum Burgoyne - Projects");
    const navigate = useNavigate();

    const [projects, setProjects] = useState<Project[]>([]);

    // load projects into state
    useEffect(() => {
        const loadProjects = async () => {
            const resp = await loadAllProjects();
            if (resp) {
                setProjects(resp);
            }
        };
        loadProjects();
    }, []);

    return (
        <main>
            <Section header="My Projects">
                {/* list of projects */}
                <div className="flex flex-col gap-2">
                    {projects.map((p) => (
                        <Card
                            key={p.slug}
                            className="flex w-full flex-wrap items-start justify-between gap-x-8 gap-y-4"
                            onClick={() => navigate(`/projects/${p.slug}`)}
                        >
                            {/* Project Image */}
                            <img
                                src={`/project_images/${p.slug}/banner.png`}
                                className="aspect-7/1 w-full rounded object-cover"
                            />
                            <div className="flex flex-col gap-3">
                                {/* Dates, Title and summary */}
                                <div className="flex flex-col gap-1">
                                    <Text
                                        variant="secondary"
                                        className="text-xs"
                                    >
                                        {shortenDate(p.startDate) ?? "???"}
                                        {shortenDate(p.startDate) ===
                                        shortenDate(p.finishDate)
                                            ? ""
                                            : shortenDate(p.finishDate)
                                              ? " - " +
                                                shortenDate(p.finishDate)
                                              : " - ???"}
                                    </Text>
                                    <Text
                                        variant="primary"
                                        className="font-semibold"
                                    >
                                        {p.title}
                                    </Text>
                                    <Text
                                        variant="secondary"
                                        className="text-sm"
                                    >
                                        {p.summary}
                                    </Text>
                                </div>
                                {/* 3 main technologies */}
                                <span className="flex flex-wrap gap-1">
                                    {p.technologies.slice(0, 3).map((t) => (
                                        <Skill key={t} skill={t} />
                                    ))}
                                </span>
                            </div>
                            {/* Github and/or Live Link */}
                            <span className="flex gap-2">
                                {p.githubRepo && (
                                    <RedirectIcon
                                        type="devicon"
                                        to={
                                            "https://github.com/" + p.githubRepo
                                        }
                                        icon="github-original"
                                        newTab
                                        hoverText="Github"
                                    />
                                )}
                                {p.liveURL && (
                                    <RedirectIcon
                                        type="material"
                                        to={p.liveURL}
                                        icon="link"
                                        newTab
                                        hoverText="Live Demo"
                                        className="text-sm"
                                    />
                                )}
                            </span>
                        </Card>
                    ))}
                </div>
            </Section>
        </main>
    );
};

export default ProjectsPage;
