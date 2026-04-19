import type { ReactNode } from "react";
import Text from "./Text";

interface SectionHeaderProps {
    children: ReactNode;
}

const SectionHeader = ({ children }: SectionHeaderProps) => {
    return (
        <span className="flex items-center gap-2.5">
            <span className="bg-highlight h-3.5 w-0.5 rounded-full sm:h-4"></span>
            <Text
                variant="secondary"
                className="text-xs font-semibold tracking-[0.2em] uppercase sm:text-sm"
            >
                {children}
            </Text>
        </span>
    );
};

export default SectionHeader;
