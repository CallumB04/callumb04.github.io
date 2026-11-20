import { twMerge } from "tailwind-merge";
import Text from "../Text/Text";

interface TimeframeProps {
    timeframe: string; // e.g. "Jan 2025 - Current", or a single date
    className?: string;
}

// Dates set as plain text, the way they sit beside a role on a printed CV,
// with a proper en dash between the start and end
const Timeframe = ({ timeframe, className }: TimeframeProps) => (
    <Text
        as="span"
        variant="secondary"
        className={twMerge(
            "text-text-tertiary shrink-0 text-sm whitespace-nowrap tabular-nums",
            className
        )}
    >
        {timeframe.replace(" - ", " – ")}
    </Text>
);

export default Timeframe;
