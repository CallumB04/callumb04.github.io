import RedirectIcon from "../../components/Icon/RedirectIcon";
import Text from "../../components/Text/Text";
import usePageTitle from "../../hooks/usePageTitle";

const ContactPage = () => {
    usePageTitle("Contact Me | Callum Burgoyne");
    return (
        <main className="relative z-20 mx-auto mt-0! flex h-screen max-w-max flex-col items-center justify-center gap-6! px-2 text-center sm:gap-8! sm:px-4">
            <div className="flex flex-col items-center gap-3 sm:gap-4">
                {/* Image of me */}
                <img
                    src="/work_logos/freelance.jpg"
                    className="size-24 rounded-full sm:size-32"
                />
                <Text
                    variant="highlight"
                    className="text-3xl font-medium sm:text-4xl"
                >
                    Contact me
                </Text>
                <Text variant="secondary" className="text-sm sm:text-base">
                    Check out my links below or email me at{" "}
                    <span className="font-semibold underline">
                        burgoynecallum04@gmail.com
                    </span>
                </Text>
            </div>
            {/* Socials */}
            <span className="flex flex-wrap justify-center gap-3">
                <RedirectIcon
                    type="devicon"
                    to="https://github.com/CallumB04"
                    icon="github-original"
                    hoverText="Github"
                    newTab
                    className="size-11"
                    iconClassName="text-[26px]"
                />
                <RedirectIcon
                    type="devicon"
                    to="https://www.linkedin.com/in/callum-burgoyne-1b411a324/"
                    icon="linkedin-plain"
                    hoverText="Linkedin"
                    newTab
                    className="size-11"
                    iconClassName="text-2xl"
                />
                <RedirectIcon
                    type="material"
                    to="mailto:burgoynecallum04@gmail.com"
                    icon="mail"
                    hoverText="Email me"
                    newTab
                    className="size-11"
                    iconClassName="text-lg"
                />
            </span>
        </main>
    );
};

export default ContactPage;
