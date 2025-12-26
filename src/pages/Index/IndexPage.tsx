import { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import PersonalDetail from "../../components/PersonalDetail/PersonalDetail";
import Skill from "../../components/Skill/Skill";
import Text from "../../components/Text/Text";
import usePageTitle from "../../hooks/usePageTitle";
import { type BlogPost, type Project } from "../../data/models";
import { loadAllBlogPosts, loadAllProjects } from "../../data/loader";
import Section from "../../components/Section/Section";
import { useNavigate } from "react-router-dom";
import Icon from "../../components/Icon/Icon";
import Button from "../../components/Button/Button";
import RedirectIcon from "../../components/Icon/RedirectIcon";
import WorkExperience from "./components/WorkExperience";

// My Key Skills
const KEY_SKILLS = ["typescript", "react", "go", "tailwind", "python", "cpp"];

const IndexPage = () => {
    usePageTitle("Callum Burgoyne | Software Developer");

    const navigate = useNavigate();

    const [projects, setProjects] = useState<Project[]>([]);
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

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

    // load blog posts into state
    useEffect(() => {
        const loadBlogPosts = async () => {
            const resp = await loadAllBlogPosts();
            if (resp) {
                setBlogPosts(resp);
            }
        };
        loadBlogPosts();
    }, []);

    return (
        <main>
            {/* About me section */}
            <Section header="About me">
                <div className="mb-12 flex flex-col gap-16 md:flex-row md:gap-8">
                    {/* Left container */}
                    <div className="flex w-full flex-col gap-8 md:min-w-80">
                        {/* Hello text */}
                        <Text
                            variant="primary"
                            className="text-4xl font-medium"
                        >
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
                        {/* Download CV Button */}
                        <a href="/CV.pdf" download className="w-full">
                            <Button
                                variant="primary"
                                maxWidth
                                className="h-12 cursor-pointer font-semibold"
                            >
                                Download my CV
                                <Icon
                                    icon="download"
                                    variant="button-primary"
                                />
                            </Button>
                        </a>
                    </div>
                    <div className="flex w-full flex-col gap-8">
                        {/* Key Skills */}
                        <div className="flex flex-col gap-3">
                            <Text
                                variant="primary"
                                className="text-sm font-medium"
                            >
                                Key Skills
                            </Text>
                            <div className="flex flex-wrap gap-1">
                                {KEY_SKILLS.map((ts) => (
                                    <Skill key={ts} skill={ts} />
                                ))}
                            </div>
                        </div>
                        {/* My links */}
                        <div className="flex flex-col gap-3">
                            <Text
                                variant="primary"
                                className="text-sm font-medium"
                            >
                                My Links
                            </Text>
                            <span className="flex gap-3">
                                <RedirectIcon
                                    type="devicon"
                                    to="https://github.com/CallumB04"
                                    icon="github-original"
                                    hoverText="Github"
                                    newTab
                                    className="h-11 sm:w-11"
                                    iconClassName="text-[26px]"
                                />
                                <RedirectIcon
                                    type="devicon"
                                    to="https://www.linkedin.com/in/callum-burgoyne-1b411a324/"
                                    icon="linkedin-plain"
                                    hoverText="Linkedin"
                                    newTab
                                    className="h-11 sm:w-11"
                                    iconClassName="text-2xl"
                                />
                                <RedirectIcon
                                    type="material"
                                    to="mailto:burgoynecallum04@gmail.com"
                                    icon="mail"
                                    hoverText="Email me"
                                    newTab
                                    className="h-11 sm:w-11"
                                    iconClassName="text-lg"
                                />
                            </span>
                        </div>
                    </div>
                </div>
            </Section>
            {/* Projects section (preview of max 3 and can redirect to all projects page) */}
            <Section
                header="Featured Projects"
                redirect={{ text: "View all", to: "/projects" }}
                id="projects"
            >
                {/* list of featured projects */}
                <div className="flex flex-col gap-2">
                    {projects
                        .filter((p) => p.featured)
                        .map((p) => (
                            <Card
                                key={p.slug}
                                className="flex w-full flex-wrap items-start justify-between gap-x-8 gap-y-4"
                                onClick={() => navigate(`/projects/${p.slug}`)}
                            >
                                <div className="flex flex-col gap-3">
                                    {/* Title and summary */}
                                    <div className="flex flex-col gap-1">
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
                                                "https://github.com/" +
                                                p.githubRepo
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
            {/* Work experience section */}
            <Section header="Work" id="work">
                <div className="flex flex-col gap-2">
                    <WorkExperience
                        timeframe="Jan 2025 - Current"
                        workplace="10X Managers"
                        role="Apprentice Software Developer"
                        workLogo="10X.png"
                        details={[
                            "My first full-time professional role",
                            "Primarily working in Full-Stack Web Development",
                            "Quickly gained team lead responsibilities, involving managing product roadmap; delegating tasks; reporting team progress in weekly company meetings; and mentoring members of my team",
                        ]}
                        technologies={["bubble", "n8n", "docker", "react"]}
                    />
                    <WorkExperience
                        timeframe="Oct 2024 - Jan 2025"
                        workplace="Freelance"
                        role="Freelance Web Developer"
                        workLogo="freelance.jpg"
                        details={[
                            "Developed commercial websites for real-world local businesses",
                            "Connected with clients through facebook and maintained frequent communication during the development process",
                        ]}
                        technologies={["javascript", "tailwind"]}
                    />
                </div>
            </Section>
            {/* Recent Blogs section (preview of max 3 and can redirect to all blogs page) */}
            <Section
                header="Recent Blogs"
                redirect={{ text: "View all", to: "/blogs" }}
                id="blogs"
            >
                {/* 3 recent blog posts */}
                <div className="flex flex-col gap-2">
                    {blogPosts.slice(0, 3).map((b) => (
                        <Card
                            key={b.slug}
                            className="flex w-full flex-wrap items-start justify-between gap-x-8 gap-y-4"
                            onClick={() => navigate(`/blogs/${b.slug}`)}
                        >
                            {/* Date, Title and summary */}
                            <div className="flex flex-col gap-1">
                                <Text variant="secondary" className="text-xs">
                                    {b.date}
                                </Text>
                                <Text
                                    variant="primary"
                                    className="font-semibold"
                                >
                                    {b.title}
                                </Text>
                                <Text variant="secondary" className="text-sm">
                                    {b.summary}
                                </Text>
                            </div>
                            {/* Open related project icon */}
                            {b.relatedProject && (
                                <RedirectIcon
                                    type="material"
                                    to={"/projects/" + b.relatedProject}
                                    icon="folder_open"
                                    hoverText="Related Project"
                                />
                            )}
                        </Card>
                    ))}
                </div>
            </Section>
        </main>
    );
};

export default IndexPage;
