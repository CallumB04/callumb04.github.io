import type { ReactNode } from "react";
import Text from "./Text";

interface SectionHeaderProps {
    children: ReactNode;
}

const SectionHeader = ({ children }: SectionHeaderProps) => {
    return (
        <Text
            as="h2"
            variant="primary"
            className="text-lg font-semibold sm:text-xl"
        >
            {children}
        </Text>
    );
};

export default SectionHeader;
