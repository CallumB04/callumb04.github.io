import { useEffect, useRef, type ReactNode } from "react";
import SectionHeader from "../Text/SectionHeader";
import RedirectText from "../Text/RedirectText";

interface SectionProps {
    children?: ReactNode;
    header: string;
    redirect?: { text: string; to: string };
    id?: string;
}

const Section = ({ children, header, redirect, id }: SectionProps) => {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add("revealed");
                    observer.unobserve(el);
                }
            },
            { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            id={id}
            ref={ref}
            data-reveal
            className="z-20 flex flex-col gap-4 sm:gap-6"
        >
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
