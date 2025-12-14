import type { ReactNode } from "react";
import SectionHeader from "../Text/SectionHeader";

interface SectionProps {
    children?: ReactNode;
    header: string;
    id?: string;
}

const Section = ({ children, header, id }: SectionProps) => {
    return (
        <div id={id} className="flex flex-col gap-6">
            <SectionHeader>{header}</SectionHeader>
            {children}
        </div>
    );
};

export default Section;
