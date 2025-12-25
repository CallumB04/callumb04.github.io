import Card from "../../../components/Card/Card";
import Icon from "../../../components/Icon/Icon";
import Skill from "../../../components/Skill/Skill";
import Text from "../../../components/Text/Text";

interface WorkExperienceProps {
    timeframe: string; // Jan 2024 - Feb 2025
    workplace: string;
    role: string;
    workLogo: string; // /public/work_logos/<imageFile>
    details?: string[]; // bullet points
    technologies?: string[];
}

const WorkExperience = ({
    timeframe,
    workplace,
    role,
    workLogo,
    details,
    technologies,
}: WorkExperienceProps) => {
    return (
        <Card className="flex w-full flex-col gap-3">
            <div className="flex w-full flex-row-reverse gap-4 sm:flex-row">
                <img
                    src={"/work_logos/" + workLogo}
                    className="size-14 rounded-full"
                />
                {/* Job Info */}
                <div className="flex w-full flex-col gap-0.5">
                    <Text variant="secondary" className="text-xs">
                        {timeframe}
                    </Text>
                    <Text variant="primary" className="font-semibold">
                        {workplace}
                    </Text>
                    <Text variant="secondary" className="text-sm">
                        {role}
                    </Text>
                </div>
            </div>
            {/* Bullet point details */}
            {details && (
                <div className="flex flex-col gap-1.5 sm:ml-18">
                    {details.map((d) => (
                        <span key={d} className="flex gap-1.5">
                            <Icon
                                variant="highlight"
                                icon="subdirectory_arrow_right"
                                className="text-xs"
                            />
                            <Text variant="secondary" className="text-sm">
                                {d}
                            </Text>
                        </span>
                    ))}
                </div>
            )}
            {/* Technologies */}
            {technologies && (
                <span className="mt-1 flex flex-wrap gap-1 sm:ml-18">
                    {technologies.map((t) => (
                        <Skill key={t} skill={t} />
                    ))}
                </span>
            )}
        </Card>
    );
};

export default WorkExperience;
