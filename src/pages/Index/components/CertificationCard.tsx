import Card from "../../../components/Card/Card";
import Icon from "../../../components/Icon/Icon";
import Text from "../../../components/Text/Text";
import RedirectLabel from "../../../components/Icon/RedirectLabel";
import RelatedPosts from "../../../components/RelatedPosts/RelatedPosts";
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
                    className="border-card-border size-14 rounded-full border"
                />
                {/* Certification info */}
                <div className="flex w-full flex-col gap-0.5">
                    <span className="mb-1 flex flex-wrap items-center gap-2">
                        <span className="bg-card-bg-elevated text-text-tertiary border-card-border inline-flex w-max items-center gap-1.5 rounded-md border px-2 py-0.5 font-mono text-[11px] font-medium tracking-wide">
                            <i
                                className="material-symbols-outlined"
                                style={{ fontSize: "14px" }}
                            >
                                calendar_month
                            </i>
                            {certification.date}
                        </span>
                        {certification.grade && (
                            <span className="bg-highlight/10 text-highlight border-highlight/30 inline-flex w-max items-center gap-1.5 rounded-md border px-2 py-0.5 font-mono text-[11px] font-medium tracking-wide">
                                <i
                                    className="material-symbols-outlined"
                                    style={{ fontSize: "14px" }}
                                >
                                    workspace_premium
                                </i>
                                {certification.grade}
                            </span>
                        )}
                    </span>
                    <Text variant="primary" className="font-semibold">
                        {certification.title}
                    </Text>
                    <Text variant="secondary" className="text-sm">
                        {certification.issuer}
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
                {/* Blog posts written about this certification */}
                <RelatedPosts posts={relatedPosts} />
            </div>
        </Card>
    );
};

export default CertificationCard;
