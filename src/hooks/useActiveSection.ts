import { useEffect, useState } from "react";

/**
 * Tracks which of the given section elements the reader is currently in,
 * by finding the last one whose top has passed under the navbar.
 */
const useActiveSection = (ids: string[]) => {
    const [activeId, setActiveId] = useState<string | undefined>(undefined);

    // ids come from a map() in the caller, so compare the contents rather than
    // the array itself - otherwise this resubscribes on every single render
    const key = ids.join("|");

    useEffect(() => {
        const sectionIds = key ? key.split("|") : [];
        if (sectionIds.length === 0) return;

        const updateActive = () => {
            let current = sectionIds[0];

            for (const id of sectionIds) {
                const el = document.getElementById(id);
                if (!el) continue;

                // a section counts as reached once it sits where scrolling to
                // it would leave it, so clicking a link marks that link active
                const landing =
                    (parseFloat(getComputedStyle(el).scrollMarginTop) || 0) + 4;

                if (el.getBoundingClientRect().top <= landing) {
                    current = id;
                }
            }

            setActiveId(current);
        };

        updateActive();
        window.addEventListener("scroll", updateActive, { passive: true });
        window.addEventListener("resize", updateActive);

        return () => {
            window.removeEventListener("scroll", updateActive);
            window.removeEventListener("resize", updateActive);
        };
    }, [key]);

    return activeId;
};

export default useActiveSection;
