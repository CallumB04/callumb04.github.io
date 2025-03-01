import "./styles/App.css";
import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PortfolioPage from "./pages/PortfolioPage/PortfolioPage";
import ProjectPage from "./pages/ProjectPage/ProjectPage";

function App() {
    // Projects information used in portfolio and project pages
    // title - project name
    // description - short description about project
    // longAbout - long description used in project pages
    //           - some use JSX elements instead of string literal
    // githubRepo - link to repository
    // liveWebsite - link to live demo ("" if none)
    // mainTechnologies - 2-3 main technologies of project, on projects section of portfolio
    // allTechnologies - everything used to make project, on project pages
    // images - array of image files for project
    const projects = {
        playrates: {
            title: "PlayRates",
            description: "A video game tracking website",
            longAbout: `
		PlayRates is a Video Game tracking website, which I am building using React 
		and Tailwind CSS. I am using this project to learn new technologies, and I 
		have potential future plans to scale the website into a fully functional 
		platform for public use! The site will allow users to add their games to Played,
		Playing, Backlog, or Wishlist; rate their games; and add extra information such
		as hours played, etc.
	  `,
            githubRepo: "https://github.com/CallumB04/PlayRates",
            liveWebsite: "https://callumb04.github.io/PlayRates",
            mainTechnologies: ["React", "Tailwind CSS", "Typescript"],
            allTechnologies: [
                "React",
                "Tailwind CSS",
                "Typescript",
                "Javascript",
                "HTML",
                "Vite",
                "Node.js",
                "Express.js",
                "APIs",
            ],
            images: [
                "homepage.png",
                "login.png",
                "profile.png",
                "remove-friend.png",
            ],
        },
        sjbsafety: {
            title: "sjbsafety.co.uk",
            description:
                "A commercial website built for a scaffolding safety business",
            longAbout: `
        I developed a commercial website for a scaffolding safety business based in 
        London and surrounding areas. This was my second freelance web development client, 
        and the project gave me valuable experience in creating a clean, professional, and 
        user-friendly website tailored to meet the client's business needs.`,
            githubRepo: "https://github.com/CallumB04/sjbsafety.co.uk",
            liveWebsite: "https://sjbsafety.co.uk",
            mainTechnologies: ["Javascript", "Tailwind CSS", "HTML"],
            allTechnologies: ["Javascript", "Tailwind CSS", "HTML"],
            images: ["homepage.png", "services.png"],
        },
        portfolio: {
            title: "Portfolio Website",
            description:
                "An up-to-date portfolio showcasing my skills and projects",
            longAbout: `
        The second variation of my Personal Portfolio website, which I
        am using to showcase my projects and all the languages and technologies I
        know how to use as a self-taught Software Developer. The website contains a main
        Portfolio Page with all of my information and projects, and seperate Project
        Pages for each project I have worked on.
      `,
            githubRepo: "https://github.com/CallumB04/callumb04.github.io",
            liveWebsite: "https://callumb04.github.io",
            mainTechnologies: ["React", "Javascript", "CSS"],
            allTechnologies: [
                "React",
                "Javascript",
                "CSS",
                "HTML",
                "Vite",
                "Node.js",
            ],
            images: ["homepage.png"],
        },
        "react-todolist": {
            title: "React Todolist",
            description: "An interactive to-do list App",
            longAbout: `
        An interactive to-do list Application, with many features. Including but not
        limited to: Adding tasks; Removing Tasks; Marking tasks as completed;
        Editing Tasks; etc. This was my first project using the React front-end
        Javascript framework, and taught me a lot about how to use it efficiently.
      `,
            githubRepo: "https://github.com/CallumB04/react-todolist",
            liveWebsite: "https://callumb04.github.io/react-todolist",
            mainTechnologies: ["React", "Javascript", "CSS"],
            allTechnologies: ["React", "Javascript", "CSS", "HTML", "Node.js"],
            images: ["react-todolist.png"],
        },
        russthetechguy: {
            title: "russthetechguy",
            description:
                "A commercial website built for a computer repair technician business",
            longAbout: `
        A commercial and professional website I built for a Computer Repair Technician business,
        located in the South-East of The United Kingdom. This was my first freelance Web
        Development work, and I plan to work with more clients to build websites
        for their businesses in the near future. It was my largest scale project to date,
        and taught me a lot about managing a bigger code base.
      `,
            githubRepo: "https://github.com/CallumB04/russthetechguy.co.uk",
            liveWebsite: "https://russthetechguy.co.uk",
            mainTechnologies: ["HTML", "Javascript", "CSS"],
            allTechnologies: ["HTML", "Javascript", "CSS"],
            images: ["russthetechguy.png"],
        },
        "old-portfolio": {
            title: "Old Portfolio",
            description:
                "My original portfolio website, and first project within web development",
            longAbout: (
                <>
                    The original Personal Portfolio website I built to showcase
                    my skills and projects as a self-taught Software Developer.
                    It was my first project within Web Development, where I
                    learnt from scratch how to use HTML, CSS and Javascript
                    efficiently. The website is no longer in use due to my{" "}
                    <Link to="/projects/portfolio">New Portfolio</Link>.
                </>
            ),
            githubRepo: "https://github.com/CallumB04/old-portfolio",
            liveWebsite: "https://callumb04.github.io/old-portfolio",
            mainTechnologies: ["HTML", "Javascript", "CSS"],
            allTechnologies: ["HTML", "Javascript", "CSS"],
            images: ["portfolio-website.png"],
        },
        "platform-shooter": {
            title: "Platform Shooter",
            description: "An in-progress 2D platforming shooter game",
            longAbout: `
        A 2D platforming shooter game I am building using C++ and the
        SFML rendering Library. This is my first big independent game project,
        which I am using to improve on my Object-oriented Programming skills.
        The project is currently on hold due to my active learning of web development,
        however I plan to return to it in the near future.
      `,
            githubRepo: "https://github.com/CallumB04/platform-shooter",
            liveWebsite: "",
            mainTechnologies: ["C++", "SFML"],
            allTechnologies: ["C++", "SFML"],
            images: ["platform-shooter.png"],
        },
        "auto-mate": {
            title: "Auto-mate",
            description:
                "A Discord bot with many automation and moderation features",
            longAbout: `
        A Discord bot with many automation and moderation features. I presented
        this application as the final project for my A-Level Computer Science
        course. This was also my first experience of rigorous testing to ensure
        there were no bugs or issues with the Bot.
      `,
            githubRepo: "https://github.com/CallumB04/auto-mate",
            liveWebsite: "",
            mainTechnologies: ["Python", "discord.py"],
            allTechnologies: ["Python", "discord.py", "Docker"],
            images: ["auto-mate.png"],
        },
        "snake-sfml": {
            title: "Snake Game",
            description: "A simple re-creation of the game snake",
            longAbout: `
        A simple adaption of the well-known Snake game, built using C++
        and the SFML Library. This is an older project and one of my first
        experiences re-creating a 2D game from scratch in C++.
      `,
            githubRepo: "https://github.com/CallumB04/snake-sfml",
            liveWebsite: "",
            mainTechnologies: ["C++", "SFML"],
            allTechnologies: ["C++", "SFML"],
            images: ["snake.png"],
        },
    };

    // holding window width in state to pass to child components
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // adds and removes event listener for handling window resizes on mount/unmount
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        // remove event listener on unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // References for the sections in the portfolio page
    const homeSection = useRef(null);
    const aboutSection = useRef(null);
    const projectsSection = useRef(null);

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <PortfolioPage
                            projects={projects}
                            refs={{
                                homeSection: homeSection,
                                aboutSection: aboutSection,
                                projectsSection: projectsSection,
                            }}
                            windowWidth={windowWidth}
                        />
                    }
                />
                <Route
                    path="/projects/:projectName"
                    element={<ProjectPage projects={projects} />}
                />
            </Routes>
        </Router>
    );
}

export default App;
