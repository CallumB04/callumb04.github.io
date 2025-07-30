import "./HomeSection.css";

const HomeSection = ({ sectionRefs }) => {
    // function to scroll to other sections on button press
    const scrollToSection = (section) => {
        section.current.scrollIntoView({ behavior: "smooth" });
    };

    // button functions
    const scrollToAbout = () => {
        scrollToSection(sectionRefs.aboutSection);
    };
    const scrollToProjects = () => {
        scrollToSection(sectionRefs.projectsSection);
    };

    return (
        <section
            className="portfolio-section light-mode"
            id="home-section"
            ref={sectionRefs.homeSection}
        >
            <div id="home-section-content">
                <h1 className="section-title" id="home-section-title">
                    Hi, I'm Callum Burgoyne
                </h1>

                <p
                    className="section-description"
                    id="home-section-description"
                >
                    A self-taught <strong>Software Developer</strong>, currently
                    pursuing a Level 4 Apprenticeship!
                </p>

                <div id="home-section-socials-wrapper">
                    <a href="https://github.com/CallumB04" target="_blank">
                        <i className="home-section-socials fab fa-github"></i>
                    </a>
                    <a href="https://calbgyn.itch.io" target="_blank">
                        <i className="home-section-socials fab fa-itch-io"></i>
                    </a>
                    <a
                        href="https://www.linkedin.com/in/callum-burgoyne-1b411a324"
                        target="_blank"
                    >
                        <i className="home-section-socials fab fa-linkedin"></i>
                    </a>
                    <a href="https://instagram.com/calbgyn" target="_blank">
                        <i className="home-section-socials fab fa-instagram"></i>
                    </a>
                    <a href="mailto:burgoynecallum04@gmail.com" target="_blank">
                        <i className="home-section-socials fa fa-envelope"></i>
                    </a>
                </div>

                <div id="home-section-buttons-wrapper">
                    <div
                        className="home-section-button"
                        onClick={scrollToAbout}
                    >
                        About Me
                        <i className="fa fa-arrow-right"></i>
                    </div>
                    <div
                        className="home-section-button"
                        onClick={scrollToProjects}
                    >
                        My Projects
                        <i className="fa fa-arrow-right"></i>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeSection;
