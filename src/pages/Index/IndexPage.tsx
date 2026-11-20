import { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import PersonalDetail from "../../components/PersonalDetail/PersonalDetail";
import Skill from "../../components/Skill/Skill";
import Text from "../../components/Text/Text";
import usePageTitle from "../../hooks/usePageTitle";
import {
    type BlogPost,
    type Certification,
    type Project,
    type Workplace,
} from "../../data/models";
import {
    loadAllBlogPosts,
    loadAllCertifications,
    loadAllProjects,
    loadAllWorkplaces,
} from "../../data/loader";
import Section from "../../components/Section/Section";
import { useNavigate, useSearchParams } from "react-router-dom";
import Icon from "../../components/Icon/Icon";
import Button from "../../components/Button/Button";
import RedirectIcon from "../../components/Icon/RedirectIcon";
import RedirectButton from "../../components/Button/RedirectButton";
import RedirectLabel from "../../components/Icon/RedirectLabel";
import ProjectStatus from "../../components/ProjectStatus/ProjectStatus";
import WorkExperience from "./components/WorkExperience";
import CertificationCard from "./components/CertificationCard";
import BlogPostCard from "../../components/BlogPostCard/BlogPostCard";
import RelatedPosts from "../../components/RelatedPosts/RelatedPosts";
import { twMerge } from "tailwind-merge";

// My Key Skills
const KEY_SKILLS = ["typescript", "react", "go", "tailwind", "python"];

const HeroPhoto = ({ className }: { className?: string }) => (
    <img
        src="/work_logos/freelance.jpg"
        alt="Callum Burgoyne"
        className={twMerge(
            "border-card-border ring-highlight/25 ring-offset-page-bg shrink-0 rounded-full border-2 object-cover ring-1 ring-offset-4",
            className
        )}
    />
);

const IndexPage = () => {
    usePageTitle("Callum Burgoyne | Full-Stack Web Developer");

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
    const [workplaces, setWorkplaces] = useState<Workplace[]>([]);
    const [certifications, setCertifications] = useState<Certification[]>([]);

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

    // load work experience into state
    useEffect(() => {
        const loadWorkplaces = async () => {
            const resp = await loadAllWorkplaces();
            if (resp) {
                setWorkplaces(resp);
            }
        };
        loadWorkplaces();
    }, []);

    // load certifications into state
    useEffect(() => {
        const loadCertifications = async () => {
            const resp = await loadAllCertifications();
            if (resp) {
                setCertifications(resp);
            }
        };
        loadCertifications();
    }, []);

    const featuredProjects = projects.filter((p) => p.featured);

    return (
        <main>
            {/* About me section - opens with the headline, so no section header */}
            <Section className="mb-8 sm:mb-12">
                <div className="flex flex-col gap-14 md:flex-row md:gap-12">
                    {/* Left container (wider, so the name sits on one line) */}
                    <div className="intro flex w-full min-w-0 flex-col gap-8 md:basis-3/5">
                        {/* Photo of me - above the headline on small screens,
                            it moves to the right column once there is one */}
                        <HeroPhoto className="size-20 md:hidden" />
                        {/* Hero headline */}
                        <Text
                            as="h1"
                            variant="primary"
                            className="text-4xl leading-[1.1] font-medium lg:text-5xl"
                        >
                            Hello, I'm{" "}
                            <span className="text-highlight block">
                                Callum Burgoyne
                            </span>
                        </Text>
                        {/* Personal details */}
                        <div className="flex flex-col gap-4">
                            <PersonalDetail
                                text="Full-Stack Web Developer"
                                icon="code"
                            />
                            <PersonalDetail text="10X Managers" icon="work" />
                            <PersonalDetail
                                text="Kent, United Kingdom"
                                icon="location_on"
                            />
                        </div>
                        {/* Summary */}
                        <Text
                            variant="secondary"
                            className="max-w-[48ch] text-sm leading-relaxed sm:text-base"
                        >
                            Full-stack web developer with almost 2 years in the
                            industry, building and maintaining applications used
                            by over 7,000 users. Completed a Level 4 Software
                            Development Apprenticeship, achieving a Distinction.
                        </Text>
                        {/* Download CV and contact */}
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <a
                                href="/Callum_Burgoyne_CV.pdf"
                                download
                                className="w-full sm:w-max"
                            >
                                <Button
                                    variant="primary"
                                    maxWidthMobile
                                    className="h-12 cursor-pointer px-6"
                                >
                                    Download my CV
                                    <Icon
                                        icon="download"
                                        variant="button-primary"
                                        className="transition-transform duration-300 group-hover:translate-y-0.5"
                                    />
                                </Button>
                            </a>
                            <RedirectButton
                                to="/contact"
                                variant="secondary"
                                maxWidthMobile
                                className="h-12 px-6"
                            >
                                Get in touch
                            </RedirectButton>
                        </div>
                    </div>
                    <div className="intro intro-late flex w-full min-w-0 flex-col gap-8 md:basis-2/5">
                        <HeroPhoto className="hidden size-32 md:block" />
                        {/* Key Skills */}
                        <div className="flex flex-col gap-3">
                            <Text
                                variant="primary"
                                className="text-sm font-medium"
                            >
                                Key skills
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
                                Links
                            </Text>
                            <span className="flex flex-wrap gap-2 sm:gap-3">
                                <RedirectIcon
                                    type="devicon"
                                    to="https://github.com/CallumB04"
                                    icon="github-original"
                                    hoverText="GitHub"
                                    newTab
                                    className="hidden size-11 sm:flex"
                                    iconClassName="text-[26px]"
                                />
                                <RedirectLabel
                                    type="devicon"
                                    to="https://github.com/CallumB04"
                                    icon="github-original"
                                    label="GitHub"
                                    newTab
                                    className="sm:hidden"
                                />
                                <RedirectIcon
                                    type="devicon"
                                    to="https://www.linkedin.com/in/callum-burgoyne-1b411a324/"
                                    icon="linkedin-plain"
                                    hoverText="LinkedIn"
                                    newTab
                                    className="hidden size-11 sm:flex"
                                    iconClassName="text-2xl"
                                />
                                <RedirectLabel
                                    type="devicon"
                                    to="https://www.linkedin.com/in/callum-burgoyne-1b411a324/"
                                    icon="linkedin-plain"
                                    label="LinkedIn"
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
                header="Featured projects"
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
                                    alt=""
                                    className="size-full object-cover transition-transform duration-700 ease-(--ease-out-soft) group-hover/card:scale-[1.03]"
                                    loading="lazy"
                                />
                                <div className="from-card-bg/70 via-card-bg/20 absolute inset-0 bg-linear-to-t to-transparent"></div>
                            </div>
                            {/* Body */}
                            <div className="flex flex-col items-start justify-between gap-4 p-4 sm:flex-row sm:flex-wrap sm:gap-x-16">
                                <div className="flex flex-col gap-3">
                                    <div className="flex flex-col gap-1">
                                        {/* Title, with its status beside it */}
                                        <div className="flex flex-wrap items-baseline gap-x-3">
                                            <Text
                                                as="h3"
                                                variant="primary"
                                                className="group-hover/card:text-highlight-soft text-lg font-semibold transition-colors duration-300"
                                            >
                                                {p.title}
                                            </Text>
                                            <ProjectStatus status={p.status} />
                                        </div>
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
                                    {/* Blog posts written about this project */}
                                    <RelatedPosts
                                        posts={blogPosts.filter(
                                            (b) =>
                                                b.relatedProject &&
                                                b.relatedProject === p.slug
                                        )}
                                    />
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
                                                hoverText="GitHub"
                                                className="hidden sm:flex"
                                            />
                                            <RedirectLabel
                                                type="devicon"
                                                to={
                                                    "https://github.com/" +
                                                    p.githubRepo
                                                }
                                                icon="github-original"
                                                label="GitHub"
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
                                                hoverText="Live Site"
                                                className="hidden text-sm sm:flex"
                                            />
                                            <RedirectLabel
                                                type="material"
                                                to={p.liveURL}
                                                icon="link"
                                                label="Live Site"
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
                    {workplaces.map((w, i) => (
                        <WorkExperience
                            key={w.workplace}
                            workplace={w}
                            blogPosts={blogPosts}
                            isLast={i === workplaces.length - 1}
                        />
                    ))}
                </div>
            </Section>
            {/* Certifications section */}
            <Section header="Certifications" id="certifications">
                <div className="flex flex-col gap-3">
                    {certifications.map((c) => (
                        <CertificationCard
                            key={c.id}
                            certification={c}
                            blogPosts={blogPosts}
                        />
                    ))}
                </div>
            </Section>
            {/* Recent Blogs section (preview of max 3 and can redirect to all blogs page) */}
            <Section
                header="Recent blog posts"
                redirect={{ text: "View all", to: "/blogs" }}
                id="blogs"
            >
                {/* 3 recent blog posts */}
                <div className="flex flex-col gap-3">
                    {blogPosts.slice(0, 3).map((b) => (
                        <BlogPostCard
                            key={b.slug}
                            post={b}
                            projects={projects}
                            workplaces={workplaces}
                        />
                    ))}
                </div>
            </Section>
        </main>
    );
};

export default IndexPage;
