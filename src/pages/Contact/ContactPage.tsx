import RedirectIcon from "../../components/Icon/RedirectIcon";
import RedirectLabel from "../../components/Icon/RedirectLabel";
import Text from "../../components/Text/Text";
import usePageTitle from "../../hooks/usePageTitle";
import CopyEmail, { EMAIL } from "../../components/CopyEmail/CopyEmail";

const ContactPage = () => {
    usePageTitle("Contact Me | Callum Burgoyne");

    return (
        <main className="relative z-20 mx-auto mt-0! flex h-screen max-w-max flex-col items-center justify-center gap-6! px-2 text-center sm:gap-8! sm:px-4">
            <div className="intro flex flex-col items-center gap-3 sm:gap-4">
                {/* Image of me */}
                <img
                    src="/work_logos/freelance.jpg"
                    alt="Callum Burgoyne"
                    className="border-card-border ring-highlight/20 ring-offset-page-bg size-24 rounded-full border-2 ring-1 ring-offset-4 sm:size-32"
                />
                <Text
                    as="h1"
                    variant="primary"
                    className="text-3xl font-semibold sm:text-4xl"
                >
                    <span className="text-highlight">Contact me</span>
                </Text>
                <Text variant="secondary" className="text-sm sm:text-base">
                    Click the address below to copy, or visit one of my socials.
                </Text>
            </div>

            {/* Copy email */}
            <CopyEmail />

            {/* Socials */}
            <span className="flex flex-wrap justify-center gap-2 sm:gap-3">
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
                    to={"mailto:" + EMAIL}
                    icon="mail"
                    hoverText="Email me"
                    newTab
                    className="hidden size-11 sm:flex"
                    iconClassName="text-lg"
                />
                <RedirectLabel
                    type="material"
                    to={"mailto:" + EMAIL}
                    icon="mail"
                    label="Email me"
                    newTab
                    className="sm:hidden"
                />
            </span>
        </main>
    );
};

export default ContactPage;
