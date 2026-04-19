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
            className="group border-card-border bg-card-bg hover:border-highlight/60 hover:shadow-highlight/10 flex w-max cursor-default items-center gap-3 rounded-md border px-3 py-1.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            onMouseOver={() => setHovered(true)}
            onMouseOut={() => setHovered(false)}
        >
            {technology?.devicon && (
                <i
                    className={twMerge(
                        "text-text-secondary text-sm sm:text-base",
                        "devicon-" + technology.devicon,
                        hovered && "colored"
                    )}
                ></i>
            )}
            <Text
                variant="secondary"
                className="group-hover:text-text-primary text-xs font-medium transition-colors sm:text-sm"
            >
                {technology?.name}
            </Text>
        </span>
    );
};

export default Skill;
