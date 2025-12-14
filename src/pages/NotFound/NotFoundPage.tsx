import RedirectButton from "../../components/Button/RedirectButton";
import Icon from "../../components/Icon/Icon";
import Text from "../../components/Text/Text";
import usePageTitle from "../../hooks/usePageTitle";

const NotFoundPage = () => {
    usePageTitle("Page not found");
    return (
        <main className="mx-auto mt-0! flex h-screen max-w-max flex-col items-center justify-center gap-8! px-2 text-center sm:px-4">
            <div className="flex flex-col gap-2">
                <Text
                    variant="highlight-soft"
                    className="text-8xl font-medium tracking-wide sm:text-9xl"
                >
                    404
                </Text>
                <Text
                    variant="highlight-soft"
                    className="text-2xl font-medium sm:text-3xl"
                >
                    PAGE NOT FOUND
                </Text>
            </div>
            <Text variant="secondary" className="px-4 text-sm sm:text-base">
                The page you are looking for does not exist or is currently
                unavailable...
            </Text>
            <RedirectButton to="/" maxWidthMobile>
                Return to Portfolio{" "}
                <Icon icon="keyboard_return" variant="button-primary" />
            </RedirectButton>
        </main>
    );
};

export default NotFoundPage;
