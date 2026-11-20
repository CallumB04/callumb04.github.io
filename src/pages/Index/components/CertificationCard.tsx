import Card from "../../../components/Card/Card";
import Icon from "../../../components/Icon/Icon";
import Text from "../../../components/Text/Text";
import RedirectLabel from "../../../components/Icon/RedirectLabel";
import RelatedLinks from "../../../components/RelatedLinks/RelatedLinks";
import RelatedPosts from "../../../components/RelatedPosts/RelatedPosts";
import Timeframe from "../../../components/Timeframe/Timeframe";
import type { BlogPost, Certification } from "../../../data/models";

interface CertificationCardProps {
    certification: Certification;
    blogPosts: BlogPost[]; // all posts, filtered by relatedCertification
}

const CertificationCard = ({
    certification,
    blogPosts,
}: CertificationCardProps) => {
    const relatedPosts = blogPosts.filter(
        (b) =>
            b.relatedCertification &&
            b.relatedCertification === certification.id
    );

    return (
        <Card className="flex w-full flex-col gap-3">
            <div className="flex w-full flex-row-reverse gap-4 sm:flex-row">
                <img
                    src={"/cert_logos/" + certification.issuerLogo}
                    alt={certification.issuer + " logo"}
                    className="border-card-border size-14 shrink-0 rounded-full border"
                />
                {/* Certification info */}
                <div className="flex w-full flex-col gap-0.5">
                    {/* Title, with the completion date opposite on wider screens */}
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                        <Text
                            as="h3"
                            variant="primary"
                            className="font-semibold"
                        >
                            {certification.title}
                        </Text>
                        <Timeframe timeframe={certification.date} />
                    </div>
                    <Text variant="secondary" className="text-sm">
                        {certification.issuer}
                        {certification.grade &&
                            ", awarded with " + certification.grade}
                    </Text>
                </div>
            </div>
            <div className="flex flex-col gap-3 sm:ml-18">
                {/* Bullet point details */}
                {certification.details && certification.details.length > 0 && (
                    <div className="flex flex-col gap-1.5">
                        {certification.details.map((d) => (
                            <span key={d} className="flex gap-1">
                                <Icon
                                    variant="highlight"
                                    icon="chevron_right"
                                    className="shrink-0 text-xs leading-5"
                                />
                                <Text variant="secondary" className="text-sm">
                                    {d}
                                </Text>
                            </span>
                        ))}
                    </div>
                )}
                {certification.credentialURL && (
                    <RedirectLabel
                        type="material"
                        to={certification.credentialURL}
                        icon="verified"
                        label="View Credential"
                        newTab
                        className="w-max"
                    />
                )}
                {/* The certificate itself, served as a file */}
                {certification.certificateFile && (
                    <RelatedLinks
                        heading="Certification"
                        links={[
                            {
                                icon: "open_in_new",
                                label: "View certificate (PDF)",
                                to:
                                    "/certificates/" +
                                    certification.certificateFile,
                                file: true,
                            },
                        ]}
                    />
                )}
                {/* Blog posts written about this certification */}
                <RelatedPosts posts={relatedPosts} />
            </div>
        </Card>
    );
};

export default CertificationCard;
