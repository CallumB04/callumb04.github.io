import RedirectButton from "../../components/Button/RedirectButton";
import Text from "../../components/Text/Text";
import usePageTitle from "../../hooks/usePageTitle";

const NotFoundPage = () => {
    usePageTitle("404 - Page not found");
    return (
        <main className="flex h-screen w-screen flex-col items-center justify-center gap-8 px-2 text-center sm:px-4">
            <div className="flex flex-col gap-2">
                <Text
                    variant="primary"
                    className="text-9xl tracking-wide font-medium"
                >
                    404
                </Text>
                <Text variant="primary" className="text-3xl font-medium">
                    PAGE NOT FOUND
                </Text>
            </div>
            <Text variant="secondary">
                The page you are looking for does not exist or is current
                unavailable
            </Text>
            <RedirectButton to="/">Return to Portfolio</RedirectButton>
        </main>
    );
};

export default NotFoundPage;
