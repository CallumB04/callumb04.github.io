import type { ReactNode } from "react";
import SectionHeader from "../Text/SectionHeader";

interface SectionProps {
    children?: ReactNode;
    header: string;
    id?: string;
}

const Section = ({ children, header, id }: SectionProps) => {
    return (
        <section id={id} className="flex flex-col gap-6">
            <SectionHeader>{header}</SectionHeader>
            {children}
        </section>
    );
};

export default Section;
