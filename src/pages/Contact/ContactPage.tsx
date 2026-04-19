import { useState } from "react";
import Icon from "../../components/Icon/Icon";
import RedirectIcon from "../../components/Icon/RedirectIcon";
import RedirectLabel from "../../components/Icon/RedirectLabel";
import Text from "../../components/Text/Text";
import usePageTitle from "../../hooks/usePageTitle";

const EMAIL = "burgoynecallum04@gmail.com";

const ContactPage = () => {
    usePageTitle("Contact Me | Callum Burgoyne");

    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(EMAIL);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // no-op
        }
    };

    return (
        <main className="relative z-20 mx-auto mt-0! flex h-screen max-w-max flex-col items-center justify-center gap-6! px-2 text-center sm:gap-8! sm:px-4">
            <div className="flex flex-col items-center gap-3 sm:gap-4">
                {/* Image of me */}
                <img
                    src="/work_logos/freelance.jpg"
                    className="border-card-border size-24 rounded-full border-2 sm:size-32"
                />
                <Text
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
            <button
                onClick={handleCopy}
                className="group border-card-border bg-card-bg hover:border-highlight hover:shadow-highlight/20 relative flex cursor-pointer items-center gap-2 rounded-md border px-4 py-2.5 font-mono text-xs font-medium transition-all hover:shadow-lg sm:text-sm"
            >
                <Icon
                    icon={copied ? "check" : "content_copy"}
                    variant={copied ? "highlight" : "primary"}
                    className="text-xs"
                />
                <span
                    className={copied ? "text-highlight" : "text-text-primary"}
                >
                    {copied ? "Copied to clipboard!" : EMAIL}
                </span>
            </button>

            {/* Socials */}
            <span className="flex flex-wrap justify-center gap-2 sm:gap-3">
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
