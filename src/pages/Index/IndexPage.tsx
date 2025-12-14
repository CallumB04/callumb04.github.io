import Button from "../../components/Button/Button";
import RedirectButton from "../../components/Button/RedirectButton";
import PersonalDetail from "../../components/PersonalDetail/PersonalDetail";
import SectionHeader from "../../components/Text/SectionHeader";
import Text from "../../components/Text/Text";
import usePageTitle from "../../hooks/usePageTitle";

const IndexPage = () => {
    usePageTitle("Callum Burgoyne - Personal Portfolio");
    return (
        <main>
            {/* About me section */}
            <div className="flex flex-col gap-6">
                <SectionHeader>About me</SectionHeader>
                <div className="flex flex-col gap-8 md:flex-row">
                    {/* Left container */}
                    <div className="flex w-full flex-col gap-6 md:w-1/2">
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
                        <span className="flex gap-2">
                            <RedirectButton to="/contact">
                                Contact Me
                            </RedirectButton>
                            <RedirectButton
                                to="/projects"
                                variant="secondary"
                                className="text-sm"
                            >
                                Go to Projects
                            </RedirectButton>
                        </span>
                    </div>
                    <div className="flex w-full flex-col gap-4 md:w-1/2"></div>
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
