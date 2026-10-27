import { Link } from "react-router-dom";
import Icon from "../Icon/Icon";
import Text from "../Text/Text";

export interface RelatedLink {
    icon: string; // material symbol
    label: string;
    to: string;
}

interface RelatedLinksProps {
    links: RelatedLink[];
    heading?: string; // omit when each label already describes itself
}

// Quiet cross-references to other pages on this site. Deliberately lighter
// than RedirectIcon / RedirectLabel, which are reserved for actions and
// outbound links (Github, Live Site, Email me, View Credential).
const RelatedLinks = ({ links, heading }: RelatedLinksProps) => {
    if (links.length === 0) {
        return null;
    }

    return (
        // w-full so the links below size against the space actually available,
        // rather than against a container that has shrunk to fit them - which
        // makes max-w-full wrap them early even with room to spare
        <div className="mt-1 flex w-full flex-col gap-1">
            {heading && (
                <Text
                    variant="secondary"
                    className="text-text-tertiary font-mono text-[11px] tracking-wide"
                >
                    {heading}
                </Text>
            )}
            <div className="flex flex-col gap-0.5">
                {links.map((l) => (
                    <Link
                        key={l.to + l.label}
                        to={l.to}
                        className="group hover:bg-card-bg-elevated -mx-2 flex w-fit max-w-full items-start gap-2 rounded px-2 py-1 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Icon
                            variant="highlight"
                            icon={l.icon}
                            className="shrink-0 text-xs leading-5"
                        />
                        <Text variant="secondary" redirect className="text-sm">
                            {l.label}
                        </Text>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default RelatedLinks;
