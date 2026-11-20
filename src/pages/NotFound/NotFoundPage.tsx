import RedirectButton from "../../components/Button/RedirectButton";
import Icon from "../../components/Icon/Icon";
import Text from "../../components/Text/Text";
import usePageTitle from "../../hooks/usePageTitle";

const NotFoundPage = () => {
    usePageTitle("Page not found");
    return (
        <main className="relative z-20 mx-auto mt-0! flex h-screen max-w-max flex-col items-center justify-center gap-8! px-2 text-center sm:px-4">
            <div className="flex flex-col gap-2">
                <Text
                    variant="highlight-soft"
                    className="font-display text-8xl font-medium tracking-tight sm:text-9xl"
                >
                    404
                </Text>
                <Text
                    as="h1"
                    variant="primary"
                    className="text-2xl font-medium sm:text-3xl"
                >
                    Page not found
                </Text>
            </div>
            <Text variant="secondary" className="px-4 text-sm sm:text-base">
                This page doesn't exist. The link may be out of date, or the
                address mistyped.
            </Text>
            <RedirectButton to="/" maxWidthMobile>
                Back to the homepage
                <Icon icon="keyboard_return" variant="button-primary" />
            </RedirectButton>
        </main>
    );
};

export default NotFoundPage;
