import { useEffect, useState } from "react";
import RedirectButton from "../../components/Button/RedirectButton";
import Card from "../../components/Card/Card";
import PersonalDetail from "../../components/PersonalDetail/PersonalDetail";
import Skill from "../../components/Skill/Skill";
import Text from "../../components/Text/Text";
import usePageTitle from "../../hooks/usePageTitle";
import { type Project } from "../../data/models";
import { loadAllProjects } from "../../data/loader";
import Section from "../../components/Section/Section";
import { useNavigate } from "react-router-dom";
import Icon from "../../components/Icon/Icon";

// My Key Skills
const KEY_SKILLS = ["typescript", "react", "go", "tailwind", "python", "cpp"];

const IndexPage = () => {
    usePageTitle("Callum Burgoyne - Personal Portfolio");

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
            {/* About me section */}
            <Section header="About me">
                <div className="flex flex-col gap-8 md:flex-row">
                    {/* Left container */}
                    <div className="flex w-full flex-col gap-8 md:min-w-80">
                        {/* Hello text */}
                        <Text variant="primary" className="text-4xl">
                            Hello, I'm{" "}
                            <span className="text-highlight">
                                Callum Burgoyne
                            </span>
                        </Text>
                        {/* Personal details */}
                        <div className="flex flex-col gap-3">
                            <PersonalDetail
                                text="Full-Stack Web Developer"
                                icon="code"
                            />
                            <PersonalDetail
                                text="10X Managers (L4 Apprentice)"
                                icon="work"
                            />
                            <PersonalDetail
                                text="Kent, United Kingdom"
                                icon="location_on"
                            />
                            <PersonalDetail text="21 Years Old" icon="person" />
                        </div>
                        {/* CTA buttons */}
                        <span className="flex w-full flex-wrap gap-2">
                            <RedirectButton to="/contact" maxWidthMobile>
                                Contact Me
                                <Icon icon="email" variant="button-primary" />
                            </RedirectButton>
                            <RedirectButton
                                to="/#projects"
                                variant="secondary"
                                maxWidthMobile
                            >
                                Go to Projects
                                <Icon
                                    icon="arrow_right"
                                    variant="button-secondary"
                                />
                            </RedirectButton>
                        </span>
                    </div>
                    <div className="flex w-full flex-col gap-8">
                        {/* Key Skills */}
                        <div className="flex flex-col gap-4">
                            <Text
                                variant="primary"
                                className="text-sm font-medium"
                            >
                                Key Skills
                            </Text>
                            <div className="flex flex-wrap gap-1">
                                {KEY_SKILLS.map((ts) => (
                                    <Skill skill={ts} />
                                ))}
                            </div>
                        </div>
                        {/* My Experience */}
                        <div className="flex flex-col gap-4">
                            <Text
                                variant="primary"
                                className="text-sm font-medium"
                            >
                                My Experience
                            </Text>
                            <div className="flex gap-2">
                                <Card className="flex w-1/2 flex-col gap-1">
                                    <Text
                                        variant="highlight"
                                        className="text-2xl font-medium"
                                    >
                                        {"> 1"}
                                    </Text>
                                    <Text
                                        variant="secondary"
                                        className="text-sm font-light"
                                    >
                                        Year working full-time in the industry
                                    </Text>
                                </Card>
                                <Card className="flex w-1/2 flex-col gap-1">
                                    <Text
                                        variant="highlight"
                                        className="text-2xl font-medium"
                                    >
                                        {projects.length}+
                                    </Text>
                                    <Text
                                        variant="secondary"
                                        className="text-sm font-light"
                                    >
                                        Finished projects with varying
                                        technologies
                                    </Text>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
            {/* Projects section (preview of max 3 and can redirect to all projects page) */}
            <Section
                header="Projects"
                subheader={`Showing 3 of ${projects.length} projects`}
                id="projects"
            >
                {/* 3 recent projects */}
                <div className="flex flex-col gap-2">
                    {projects.slice(0, 3).map((p) => (
                        <Card
                            className="flex w-full flex-col gap-3"
                            onClick={() => navigate(`/projects/${p.slug}`)}
                        >
                            {/* Title and summary */}
                            <div className="flex flex-col gap-1">
                                <Text variant="primary" className="font-light">
                                    {p.title}
                                </Text>
                                <Text
                                    variant="secondary"
                                    className="text-sm font-light"
                                >
                                    {p.summary}
                                </Text>
                            </div>
                            {/* 3 main technologies */}
                            <span className="flex flex-wrap gap-1">
                                {p.technologies.slice(0, 3).map((t) => (
                                    <Skill skill={t} />
                                ))}
                            </span>
                        </Card>
                    ))}
                    <RedirectButton
                        variant="secondary"
                        to="/projects"
                        maxWidth
                        preventTransform
                        className="mt-1"
                    >
                        View all Projects
                        <Icon
                            variant="button-secondary"
                            icon="arrow_right_alt"
                            className="text-sm"
                        />
                    </RedirectButton>
                </div>
            </Section>
            {/* Work experience section */}
            <Section header="Work" id="work"></Section>
            {/* Blogs section (preview of max 3 and can redirect to all blogs page) */}
            <Section header="Blogs" id="blogs"></Section>
        </main>
    );
};

export default IndexPage;
