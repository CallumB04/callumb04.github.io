import { useEffect, useState } from "react";
import RedirectButton from "../../components/Button/RedirectButton";
import Card from "../../components/Card/Card";
import PersonalDetail from "../../components/PersonalDetail/PersonalDetail";
import Skill from "../../components/Skill/Skill";
import SectionHeader from "../../components/Text/SectionHeader";
import Text from "../../components/Text/Text";
import usePageTitle from "../../hooks/usePageTitle";
import { type Project } from "../../data/models";
import { loadAllProjects } from "../../data/loader";

// My Key Skills
const KEY_SKILLS = ["typescript", "react", "go", "tailwind", "python", "cpp"];

const IndexPage = () => {
    usePageTitle("Callum Burgoyne - Personal Portfolio");

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
            <div className="flex flex-col gap-6">
                <SectionHeader>About me</SectionHeader>
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
                        <span className="flex w-full gap-2">
                            <RedirectButton to="/contact" maxWidthMobile>
                                Contact Me
                            </RedirectButton>
                            <RedirectButton
                                to="/projects"
                                variant="secondary"
                                maxWidthMobile
                            >
                                Go to Projects
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
            </div>
            {/* Work experience section, requires id for auto-scroll on navigation */}
            <div id="work">
                <SectionHeader>Work</SectionHeader>
            </div>
        </main>
    );
};

export default IndexPage;
