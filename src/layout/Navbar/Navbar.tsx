import { Link, useLocation } from "react-router-dom";
import RedirectButton from "../../components/Button/RedirectButton";
import Icon from "../../components/Icon/Icon";
import Text from "../../components/Text/Text";
import NavbarItem from "./NavbarItem";
import { useEffect } from "react";

const Navbar = () => {
    const location = useLocation();

    // scroll on page change
    useEffect(() => {
        // scroll to page top
        if (!location.hash) {
            window.scrollTo(0, 0);
            return;
        }

        // if hash (#work) exists, scroll to that element
        const element = document.querySelector(location.hash);
        if (element) {
            element.scrollIntoView();
        }
    }, [location]);

    return (
        <nav className="bg-page-bg border-b-layout-border h-navbar-height fixed top-0 left-0 w-screen border-b">
            {/* Navbar Content */}
            <span className="mx-auto flex h-full max-w-250 items-center px-4 sm:px-6">
                <span className="flex w-full items-center justify-center md:justify-between">
                    {/* My name */}
                    <Link
                        to="/"
                        className="hidden h-full items-center justify-center gap-1 md:flex"
                    >
                        <Text variant="highlight-soft">Callum</Text>
                        <Text variant="primary">Burgoyne</Text>
                    </Link>
                    {/* Navbar Items */}
                    <span className="flex w-full max-w-80 items-center justify-between md:max-w-max md:gap-10">
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
                            preventTransform
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
