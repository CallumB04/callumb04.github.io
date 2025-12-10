import { Link } from "react-router-dom";
import RedirectButton from "../../components/Button/RedirectButton";
import Icon from "../../components/Icon/Icon";
import Text from "../../components/Text/Text";
import NavbarItem from "./NavbarItem";

const Navbar = () => {
    return (
        <nav className="bg-page-bg border-b-layout-border h-navbar-height fixed top-0 left-0 w-screen border-b-1">
            {/* Navbar Content */}
            <span className="mx-auto flex h-full max-w-300 items-center px-4 sm:px-6">
                <span className="flex w-full items-center justify-center md:justify-between">
                    {/* Picture of me */}
                    <Text
                        variant="primary"
                        className="border-layout-border hidden rounded-full border-1 p-3 text-xl font-light md:inline"
                    >
                        CB
                    </Text>
                    {/* Navbar Items */}
                    <span className="flex w-full max-w-78 items-center justify-between md:max-w-max md:gap-12">
                        <NavbarItem text="About" icon="info" to="/" />
                        <NavbarItem
                            text="Projects"
                            icon="folder_open"
                            to="/projects"
                        />
                        <NavbarItem text="Work" icon="work" to="/#work" />
                        <NavbarItem text="Blog" icon="news" to="/blogs" />
                        {/* Contact me button */}
                        <RedirectButton
                            to="/contact"
                            className="hidden md:inline"
                        >
                            Contact me
                        </RedirectButton>
                        {/* Contact me icon (mobile) */}
                        <Link
                            to="/contact"
                            className="flex items-center md:hidden!"
                        >
                            <Icon
                                icon="mail"
                                variant="highlight"
                                className="cursor-pointer"
                                title="Contact me"
                            />
                        </Link>
                    </span>
                </span>
            </span>
        </nav>
    );
};

export default Navbar;
