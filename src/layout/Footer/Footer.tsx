import { matchPath, useLocation } from "react-router-dom";
import { EMAIL } from "../../components/CopyEmail/CopyEmail";
import Text from "../../components/Text/Text";

// pages that scroll, and so have somewhere to end - the contact and 404
// pages fill the screen on their own and already show these details
const PAGES_WITH_FOOTER = [
    "/",
    "/projects",
    "/projects/:slug",
    "/blogs",
    "/blogs/:slug",
];

const FOOTER_LINKS = [
    { label: "GitHub", to: "https://github.com/CallumB04" },
    {
        label: "LinkedIn",
        to: "https://www.linkedin.com/in/callum-burgoyne-1b411a324/",
    },
    { label: "Email", to: "mailto:" + EMAIL },
];

const Footer = () => {
    const location = useLocation();

    if (!PAGES_WITH_FOOTER.some((p) => matchPath(p, location.pathname))) {
        return null;
    }

    return (
        <footer className="border-layout-border relative z-20 border-t">
            <div className="mx-auto flex max-w-220 flex-col-reverse gap-3 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                <Text
                    variant="secondary"
                    className="text-text-tertiary text-sm"
                >
                    © {new Date().getFullYear()} Callum Burgoyne
                </Text>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                    {FOOTER_LINKS.map((l) => (
                        <a
                            key={l.label}
                            href={l.to}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-primary text-text-secondary hover:text-highlight-soft text-sm transition-colors duration-300"
                        >
                            {l.label}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
