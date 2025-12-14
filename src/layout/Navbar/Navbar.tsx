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
        <nav className="bg-page-bg h-navbar-height border-layout-border fixed top-0 left-0 flex w-screen items-center justify-center border-b px-4 sm:items-end sm:border-b-0 sm:bg-transparent">
            {/* Navbar Items */}
            <span className="sm:bg-navbar-bg flex w-full max-w-80 items-center justify-between rounded-full sm:px-4 sm:py-2">
                <NavbarItem text="Home" icon="home" to="/" />
                <NavbarItem text="Projects" icon="folder_open" to="/projects" />
                <NavbarItem text="Work" icon="work" to="/#work" />
                <NavbarItem text="Blog" icon="article_person" to="/blogs" />
                <NavbarItem text="Contact" icon="mail" to="/contact" />
            </span>
        </nav>
    );
};

export default Navbar;
