import { useEffect, useRef, type ReactNode } from "react";
import SectionHeader from "../Text/SectionHeader";
import RedirectText from "../Text/RedirectText";
import { twMerge } from "tailwind-merge";

interface SectionProps {
    children?: ReactNode;
    header?: string; // omit when the content opens with its own heading
    redirect?: { text: string; to: string };
    id?: string;
    className?: string;
}

const Section = ({
    children,
    header,
    redirect,
    id,
    className,
}: SectionProps) => {
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
            // threshold stays at 0 so tall sections (a long blog post
            // runs to several screens) still reveal - a ratio they can
            // never reach would leave them stuck at opacity 0
            { threshold: 0, rootMargin: "0px 0px -40px 0px" }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            id={id}
            ref={ref}
            data-reveal
            className={twMerge("z-20 flex flex-col gap-4 sm:gap-6", className)}
        >
            {header && (
                <span className="flex w-full items-baseline justify-between">
                    <SectionHeader>{header}</SectionHeader>
                    {redirect && (
                        <RedirectText to={redirect.to}>
                            {redirect.text}
                        </RedirectText>
                    )}
                </span>
            )}
            {children}
        </section>
    );
};

export default Section;
