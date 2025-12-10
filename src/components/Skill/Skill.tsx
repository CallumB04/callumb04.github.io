import { useEffect, useState } from "react";
import { type Technology } from "../../data/models";
import { loadTechnologyByKey } from "../../data/loader";
import Text from "../Text/Text";

interface SkillProps {
    skill: string; // key for searching in technologies.json
}
const Skill = ({ skill }: SkillProps) => {
    const [technology, setTechnology] = useState<Technology | undefined>(
        undefined
    );

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
        <span className="border-card-border bg-card-bg flex w-max items-center gap-2 rounded-full border-1 px-3 py-1.5">
            <Text variant="primary" className="text-sm">
                {technology?.name}
            </Text>
            {technology?.devicon && (
                <i
                    className={`devicon-${technology.devicon}-plain text-text-primary text-sm`}
                ></i>
            )}
        </span>
    );
};

export default Skill;
