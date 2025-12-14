import type { ReactNode } from "react";
import SectionHeader from "../Text/SectionHeader";
import Text from "../Text/Text";

interface SectionProps {
    children?: ReactNode;
    header: string;
    subheader?: string; // optional subheader, justify between with header
    id?: string;
}

const Section = ({ children, header, subheader, id }: SectionProps) => {
    return (
        <section id={id} className="flex flex-col gap-6">
            <span className="flex w-full items-center justify-between">
                <SectionHeader>{header}</SectionHeader>
                {subheader && (
                    <Text variant="secondary" className="text-xs">
                        {subheader}
                    </Text>
                )}
            </span>
            {children}
        </section>
    );
};

export default Section;
