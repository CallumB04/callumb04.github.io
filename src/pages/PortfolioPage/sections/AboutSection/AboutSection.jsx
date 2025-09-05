import { useRef } from "react";
import "./AboutSection.css";
import { useEffect } from "react";

const AboutSection = ({ sectionRef }) => {
    // storing skills in 2D arrays, <skill, hover text, devicon class>
    // automatically maps to JSX in respective sections
    // for non devicon icons, arrays will have length of 2 <skill/hover text, img url>
    const skillsLanguages = [
        ["python", "python", "python"],
        ["html", "html", "html5"],
        ["css", "css", "css3"],
        ["cpp", "c++", "cplusplus"],
        ["js", "javascript", "javascript"],
        ["ts", "typescript", "typescript"],
    ];
    const skillsFworksAndLibs = [
        ["react", "react", "react"],
        ["tailwind", "tailwind css", "tailwindcss"],
        ["sfml", "SFML.svg"],
        ["expressjs", "express.js", "express"],
    ];
    const skillsOther = [
        ["git", "git", "git"],
        ["github", "github", "github"],
        ["linux", "linux", "linux"],
        ["docker", "docker", "docker"],
        ["sass", "sass", "sass"],
        ["godot", "godot", "godot"],
    ];

    // references to download cv button elements, for animation
    const CVButtonRef = useRef(null);
    const CVButtonTextRef = useRef(null);
    const CVButtonIconRef = useRef(null);

    // handling CV button animation on hover
    useEffect(() => {
        const CVButton = CVButtonRef.current;
        const CVButtonText = CVButtonTextRef.current;
        const CVButtonIcon = CVButtonIconRef.current;

        CVButton.addEventListener("mouseover", () => {
            CVButtonIcon.style.fontSize = "calc(1.9rem + 1.2vw)";
            CVButtonIcon.style.color = "var(--highlight-color)";
            CVButtonIcon.style.left = "50%";
            CVButtonText.style.display = "none";
            CVButtonText.style.animation = "400ms fade-cv-btn-text linear";
        });

        CVButton.addEventListener("mouseout", () => {
            CVButtonIcon.style.fontSize = "calc(1.5rem + 0.9vw)";
            CVButtonIcon.style.color = "var(--text-light-color)";
            CVButtonIcon.style.left = "calc(18% - 4px)";
            CVButtonText.style.display = "block";
        });
    }, []);

    return (
        <section
            className="portfolio-section dark-mode"
            id="about-section"
            ref={sectionRef}
        >
            <h2 className="section-title about-section-title">About me</h2>
            <p className="section-description" id="about-section-description">
                Hi, I'm Callum/Cal, a 21 year old self-taught Software Developer
                from Kent, United Kingdom. I'm currently pursuing a Level 4
                Apprenticeship in Full-Stack Web Development, where I work with
                a variety of different technologies. Outside of work, I'm
                currently invested in learning Go and improving my ability to
                create a scaleable and efficient backend.
            </p>

            <a
                ref={CVButtonRef}
                id="download-cv-button"
                href="/assets/Callum_Burgoyne_CV.pdf"
                download
            >
                <i ref={CVButtonIconRef} className="fas fa-download"></i>
                <p ref={CVButtonTextRef}>Download CV</p>
            </a>

            <h2 className="section-title about-section-title">Tech Stack</h2>

            <h3 className="section-title about-section-subtitle">Languages</h3>
            <div className="about-section-skills-wrapper">
                {skillsLanguages.map((skill) => {
                    return skill.length === 3 ? (
                        <div
                            key={skill[0]}
                            className="about-section-skill"
                            id={`about-skill-${skill[0]}`}
                        >
                            <i className={`devicon-${skill[2]}-plain`}></i>
                            <style>
                                {`
                                #about-skill-${skill[0]}::after {
                                    content: "${skill[1]}";
                                }`}
                            </style>
                        </div>
                    ) : (
                        <div
                            key={skill[0]}
                            className="about-section-skill non-devicon-skill"
                            id={`about-skill-${skill[0]}`}
                        >
                            <img
                                src={`../../../../assets/skill-icons/${skill[1]}`}
                                className="non-devicon-icon"
                            />
                            <style>
                                {`
                                #about-skill-${skill[0]}::after {
                                    content: "${skill[0]}";
                                }`}
                            </style>
                        </div>
                    );
                })}
            </div>

            <h3 className="section-title about-section-subtitle">
                Frameworks + Libraries
            </h3>
            <div className="about-section-skills-wrapper">
                {skillsFworksAndLibs.map((skill) => {
                    return skill.length === 3 ? (
                        <div
                            key={skill[0]}
                            className="about-section-skill"
                            id={`about-skill-${skill[0]}`}
                        >
                            <i className={`devicon-${skill[2]}-original`}></i>
                            <style>
                                {`
                                #about-skill-${skill[0]}::after {
                                    content: "${skill[1]}";
                                }`}
                            </style>
                        </div>
                    ) : (
                        <div
                            key={skill[0]}
                            className="about-section-skill non-devicon-skill"
                            id={`about-skill-${skill[0]}`}
                        >
                            <img
                                src={`/assets/skill-icons/${skill[1]}`}
                                className="non-devicon-icon"
                            />
                            <style>
                                {`
                                #about-skill-${skill[0]}::after {
                                    content: "${skill[0]}";
                                }`}
                            </style>
                        </div>
                    );
                })}
            </div>

            <h3 className="section-title about-section-subtitle">
                Other Technologies
            </h3>
            <div className="about-section-skills-wrapper">
                {skillsOther.map((skill) => {
                    return skill.length === 3 ? (
                        <div
                            key={skill[0]}
                            className="about-section-skill"
                            id={`about-skill-${skill[0]}`}
                        >
                            <i className={`devicon-${skill[2]}-plain`}></i>
                            <style>
                                {`
                                #about-skill-${skill[0]}::after {
                                    content: "${skill[1]}";
                                }`}
                            </style>
                        </div>
                    ) : (
                        <div
                            key={skill[0]}
                            className="about-section-skill non-devicon-skill"
                            id={`about-skill-${skill[0]}`}
                        >
                            <img
                                src={`../../../../assets/skill-icons/${skill[1]}`}
                                className="non-devicon-icon"
                            />
                            <style>
                                {`
                                #about-skill-${skill[0]}::after {
                                    content: "${skill[0]}";
                                }`}
                            </style>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default AboutSection;
