import type { ReactNode } from "react";
import Text from "./Text";

interface SectionHeaderProps {
    children: ReactNode;
}

const SectionHeader = ({ children }: SectionHeaderProps) => {
    return (
        <Text variant="secondary" className="text-xs uppercase sm:text-sm">
            {children}
        </Text>
    );
};

export default SectionHeader;
