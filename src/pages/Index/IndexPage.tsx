import Text from "../../components/Text/Text";

const IndexPage = () => {
    return (
        <main>
            <Text variant="primary">IndexPage</Text>
            {/* Work experience section, requires id for auto-scroll on navigation */}
            <div id="work">
                <Text variant="primary">Work</Text>
            </div>
        </main>
    );
};

export default IndexPage;
