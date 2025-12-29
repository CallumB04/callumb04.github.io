import type { ReactNode } from "react";
import SectionHeader from "../Text/SectionHeader";
import RedirectText from "../Text/RedirectText";

interface SectionProps {
    children?: ReactNode;
    header: string;
    redirect?: { text: string; to: string };
    id?: string;
}

const Section = ({ children, header, redirect, id }: SectionProps) => {
    return (
        <section id={id} className="z-20 flex flex-col gap-4 sm:gap-6">
            <span className="flex w-full items-center justify-between">
                <SectionHeader>{header}</SectionHeader>
                {redirect && (
                    <RedirectText to={redirect.to}>
                        {redirect.text}
                    </RedirectText>
                )}
            </span>
            {children}
        </section>
    );
};

export default Section;
