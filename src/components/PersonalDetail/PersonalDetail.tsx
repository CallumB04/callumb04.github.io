import Icon from "../Icon/Icon";
import Text from "../Text/Text";

interface PersonalDetailProps {
    text: string;
    icon: string; // material icon
}

const PersonalDetail = ({ text, icon }: PersonalDetailProps) => {
    return (
        <span className="flex items-center gap-2">
            <Icon variant="highlight" icon={icon} className="text-sm" />
            <Text variant="secondary" className="text-sm">
                {text}
            </Text>
        </span>
    );
};

export default PersonalDetail;
