import { useEffect, useState } from "react";
import { type Technology } from "../../data/models";
import { loadTechnologyByKey } from "../../data/loader";
import Text from "../Text/Text";
import { twMerge } from "tailwind-merge";

interface SkillProps {
    skill: string; // key for searching in technologies.json
}
const Skill = ({ skill }: SkillProps) => {
    const [technology, setTechnology] = useState<Technology | undefined>(
        undefined
    );

    const [hovered, setHovered] = useState<boolean>(false);

    // load technology data from provided key
    useEffect(() => {
        const fetchData = async () => {
            const resp = await loadTechnologyByKey(skill);
            if (resp) {
                setTechnology(resp);
            }
        };
        fetchData();
    }, [skill]);

    return (
        <span
            className="border-layout-border bg-card-bg flex w-max items-center gap-3 rounded-lg border px-3 py-1.5"
            onMouseOver={() => setHovered(true)}
            onMouseOut={() => setHovered(false)}
        >
            {technology?.devicon && (
                <i
                    className={twMerge(
                        "text-text-secondary transition-all duration-300",
                        "devicon-" + technology.devicon,
                        hovered && "colored animate-pulse"
                    )}
                ></i>
            )}
            <Text variant="secondary" className="text-sm font-medium">
                {technology?.name}
            </Text>
        </span>
    );
};

export default Skill;
