import { twMerge } from "tailwind-merge";
import Text from "../../../components/Text/Text";

export interface BlogPostContentsItem {
    id: string;
    title: string;
}

interface BlogPostContentsProps {
    items: BlogPostContentsItem[];
    activeId: string | undefined;
    // "gutter" sits in the empty page margin beside the post, "block" stacks
    // above it on screens with no margin to spare
    variant: "gutter" | "block";
}

const BlogPostContents = ({
    items,
    activeId,
    variant,
}: BlogPostContentsProps) => {
    if (items.length === 0) {
        return null;
    }

    const list = (
        <>
            <Text
                variant="secondary"
                className="text-xs font-semibold tracking-[0.2em] uppercase"
            >
                <span className="text-highlight">#</span> Contents
            </Text>
            {/* the track runs the height of the list, and the active link
                thickens its own slice of it */}
            <div className="border-card-border flex flex-col border-l">
                {items.map((item, i) => {
                    const isActive = item.id === activeId;

                    return (
                        <a
                            key={item.id}
                            href={"#" + item.id}
                            aria-current={isActive ? "true" : undefined}
                            className={twMerge(
                                "group -ml-px flex items-baseline gap-2.5 border-l-2 py-2 pr-2 pl-4 transition-colors duration-200",
                                isActive
                                    ? "border-highlight"
                                    : "border-transparent"
                            )}
                        >
                            <Text
                                variant="secondary"
                                className={twMerge(
                                    "font-mono text-[11px] transition-colors duration-200",
                                    isActive
                                        ? "text-highlight"
                                        : "text-text-tertiary group-hover:text-highlight"
                                )}
                            >
                                {String(i + 1).padStart(2, "0")}
                            </Text>
                            <Text
                                variant="secondary"
                                redirect
                                className={twMerge(
                                    "text-sm leading-snug",
                                    isActive && "text-text-primary"
                                )}
                            >
                                {item.title}
                            </Text>
                        </a>
                    );
                })}
            </div>
        </>
    );

    // beside the post: absolutely placed past the content column, so it uses
    // the page margin and costs the post itself no width at all
    if (variant === "gutter") {
        return (
            <aside className="absolute top-0 left-full hidden h-full pl-8 min-[1300px]:block">
                <nav
                    className="sticky flex w-48 flex-col gap-3"
                    style={{ top: "calc(var(--navbar-height) + 2rem)" }}
                    aria-label="Contents"
                >
                    {list}
                </nav>
            </aside>
        );
    }

    return (
        <nav
            className="bg-card-bg border-card-border flex flex-col gap-3 rounded-md border p-4 min-[1300px]:hidden"
            aria-label="Contents"
        >
            {list}
        </nav>
    );
};

export default BlogPostContents;
