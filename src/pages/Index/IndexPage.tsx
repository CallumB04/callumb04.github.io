import { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import PersonalDetail from "../../components/PersonalDetail/PersonalDetail";
import Skill from "../../components/Skill/Skill";
import Text from "../../components/Text/Text";
import usePageTitle from "../../hooks/usePageTitle";
import { type BlogPost, type Project } from "../../data/models";
import { loadAllBlogPosts, loadAllProjects } from "../../data/loader";
import Section from "../../components/Section/Section";
import { useNavigate, useSearchParams } from "react-router-dom";
import Icon from "../../components/Icon/Icon";
import Button from "../../components/Button/Button";
import RedirectIcon from "../../components/Icon/RedirectIcon";
import RedirectLabel from "../../components/Icon/RedirectLabel";
import ProjectStatus from "../../components/ProjectStatus/ProjectStatus";
import { shortenDate } from "../Projects/ProjectsPage";
import WorkExperience from "./components/WorkExperience";

// My Key Skills
const KEY_SKILLS = ["typescript", "react", "go", "tailwind", "python"];

const IndexPage = () => {
    usePageTitle("Callum Burgoyne | Software Developer");

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // Support deep links like callumb04.github.io?blog=<slug> which avoid the
    // GitHub Pages 404 on direct /blogs/:slug URLs by landing on the index first.
    useEffect(() => {
        const blogSlug = searchParams.get("blog");
        if (blogSlug) {
            navigate(`/blogs/${blogSlug}`, { replace: true });
        }
    }, [searchParams, navigate]);

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

    const featuredProjects = projects.filter((p) => p.featured);

    return (
        <main>
            {/* About me section */}
            <Section header="About me">
                <div className="mb-12 flex flex-col gap-16 md:flex-row md:gap-8">
                    {/* Left container */}
                    <div className="flex w-full flex-col gap-8 md:min-w-80">
                        {/* Hero headline */}
                        <Text
                            variant="primary"
                            className="text-4xl leading-tight font-medium lg:text-5xl"
                        >
                            Hello, I'm{" "}
                            <span className="text-highlight">
                                Callum Burgoyne
                            </span>
                        </Text>
                        {/* Personal details */}
                        <div className="flex flex-col gap-4">
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
                            <span className="flex flex-wrap gap-2 sm:gap-3">
                                <RedirectIcon
                                    type="devicon"
                                    to="https://github.com/CallumB04"
                                    icon="github-original"
                                    hoverText="Github"
                                    newTab
                                    className="hidden size-11 sm:flex"
                                    iconClassName="text-[26px]"
                                />
                                <RedirectLabel
                                    type="devicon"
                                    to="https://github.com/CallumB04"
                                    icon="github-original"
                                    label="Github"
                                    newTab
                                    className="sm:hidden"
                                />
                                <RedirectIcon
                                    type="devicon"
                                    to="https://www.linkedin.com/in/callum-burgoyne-1b411a324/"
                                    icon="linkedin-plain"
                                    hoverText="Linkedin"
                                    newTab
                                    className="hidden size-11 sm:flex"
                                    iconClassName="text-2xl"
                                />
                                <RedirectLabel
                                    type="devicon"
                                    to="https://www.linkedin.com/in/callum-burgoyne-1b411a324/"
                                    icon="linkedin-plain"
                                    label="Linkedin"
                                    newTab
                                    className="sm:hidden"
                                />
                                <RedirectIcon
                                    type="material"
                                    to="mailto:burgoynecallum04@gmail.com"
                                    icon="mail"
                                    hoverText="Email me"
                                    newTab
                                    className="hidden size-11 sm:flex"
                                    iconClassName="text-lg"
                                />
                                <RedirectLabel
                                    type="material"
                                    to="mailto:burgoynecallum04@gmail.com"
                                    icon="mail"
                                    label="Email me"
                                    newTab
                                    className="sm:hidden"
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
                <div className="flex flex-col gap-3">
                    {featuredProjects.map((p) => (
                        <Card
                            key={p.slug}
                            className="featured-card flex w-full flex-col gap-0 p-0"
                            onClick={() => navigate(`/projects/${p.slug}`)}
                        >
                            {/* Banner */}
                            <div className="relative hidden aspect-7/1 w-full overflow-hidden rounded-t-md sm:block">
                                <img
                                    src={`/project_images/${p.slug}/banner.png`}
                                    className="size-full object-cover"
                                    loading="lazy"
                                />
                                <div className="from-card-bg/70 via-card-bg/20 absolute inset-0 bg-linear-to-t to-transparent"></div>
                            </div>
                            {/* Body */}
                            <div className="flex flex-col items-start justify-between gap-4 p-4 sm:flex-row sm:flex-wrap sm:gap-x-16">
                                <div className="flex flex-col gap-3">
                                    <div className="flex flex-col gap-1">
                                        <span className="flex flex-wrap items-center gap-2">
                                            <ProjectStatus status={p.status} />
                                            <span className="bg-card-bg-elevated text-text-tertiary border-card-border inline-flex w-max items-center gap-1.5 rounded-md border px-2 py-0.5 font-mono text-[11px] font-medium tracking-wide">
                                                <i
                                                    className="material-symbols-outlined"
                                                    style={{
                                                        fontSize: "14px",
                                                    }}
                                                >
                                                    calendar_month
                                                </i>
                                                {shortenDate(p.startDate) ??
                                                    "???"}
                                                {shortenDate(p.startDate) ===
                                                shortenDate(p.finishDate)
                                                    ? ""
                                                    : shortenDate(p.finishDate)
                                                      ? " — " +
                                                        shortenDate(
                                                            p.finishDate
                                                        )
                                                      : " — ???"}
                                            </span>
                                        </span>
                                        <Text
                                            variant="primary"
                                            className="mt-1 text-lg font-semibold"
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
                                    <span className="flex flex-wrap gap-1">
                                        {p.technologies.slice(0, 3).map((t) => (
                                            <Skill key={t} skill={t} />
                                        ))}
                                    </span>
                                </div>
                                <span className="flex flex-wrap gap-2">
                                    {p.githubRepo && (
                                        <>
                                            <RedirectIcon
                                                type="devicon"
                                                to={
                                                    "https://github.com/" +
                                                    p.githubRepo
                                                }
                                                icon="github-original"
                                                newTab
                                                hoverText="Github"
                                                className="hidden sm:flex"
                                            />
                                            <RedirectLabel
                                                type="devicon"
                                                to={
                                                    "https://github.com/" +
                                                    p.githubRepo
                                                }
                                                icon="github-original"
                                                label="Github"
                                                newTab
                                                className="sm:hidden"
                                            />
                                        </>
                                    )}
                                    {p.liveURL && (
                                        <>
                                            <RedirectIcon
                                                type="material"
                                                to={p.liveURL}
                                                icon="link"
                                                newTab
                                                hoverText="Live Demo"
                                                className="hidden text-sm sm:flex"
                                            />
                                            <RedirectLabel
                                                type="material"
                                                to={p.liveURL}
                                                icon="link"
                                                label="Live Demo"
                                                newTab
                                                className="sm:hidden"
                                            />
                                        </>
                                    )}
                                </span>
                            </div>
                        </Card>
                    ))}
                </div>
            </Section>
            {/* Work experience section */}
            <Section header="Work" id="work">
                <div className="flex flex-col gap-0">
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
                        isCurrent
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
                        isLast
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
                <div className="flex flex-col gap-3">
                    {blogPosts.slice(0, 3).map((b) => (
                        <Card
                            key={b.slug}
                            className="flex w-full flex-col gap-0 overflow-hidden p-0"
                            onClick={() => navigate(`/blogs/${b.slug}`)}
                        >
                            {/* Banner */}
                            <div className="relative hidden aspect-7/1 w-full overflow-hidden sm:block">
                                <img
                                    src={`/blogs/${b.slug}/banner.png`}
                                    className="size-full object-cover"
                                    loading="lazy"
                                />
                                <div className="from-card-bg/70 via-card-bg/20 absolute inset-0 bg-linear-to-t to-transparent"></div>
                            </div>
                            {/* Body */}
                            <div className="flex flex-col items-start justify-between gap-4 p-4 sm:flex-row sm:flex-wrap sm:gap-x-8">
                                {/* Date, Title and summary */}
                                <div className="flex flex-col gap-1">
                                    <span className="bg-card-bg-elevated text-text-tertiary border-card-border inline-flex w-max items-center gap-1.5 rounded-md border px-2 py-0.5 font-mono text-[11px] font-medium tracking-wide">
                                        <i
                                            className="material-symbols-outlined"
                                            style={{ fontSize: "14px" }}
                                        >
                                            calendar_month
                                        </i>
                                        {b.date}
                                    </span>
                                    <Text
                                        variant="primary"
                                        className="text-lg font-semibold"
                                    >
                                        {b.title}
                                    </Text>
                                    <Text
                                        variant="secondary"
                                        className="text-sm"
                                    >
                                        {b.summary}
                                    </Text>
                                </div>
                                {/* Related Project */}
                                <span className="flex flex-wrap gap-2">
                                    {b.relatedProject && (
                                        <>
                                            <RedirectIcon
                                                type="material"
                                                to={
                                                    "/projects/" +
                                                    b.relatedProject
                                                }
                                                icon="folder_open"
                                                hoverText="Related Project"
                                                className="hidden sm:flex"
                                            />
                                            <RedirectLabel
                                                type="material"
                                                to={
                                                    "/projects/" +
                                                    b.relatedProject
                                                }
                                                icon="folder_open"
                                                label="Related Project"
                                                className="sm:hidden"
                                            />
                                        </>
                                    )}
                                </span>
                            </div>
                        </Card>
                    ))}
                </div>
            </Section>
        </main>
    );
};

export default IndexPage;
