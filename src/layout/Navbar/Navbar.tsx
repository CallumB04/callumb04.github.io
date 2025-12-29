import { useLocation } from "react-router-dom";
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
        <nav className="bg-page-bg h-navbar-height border-layout-border fixed top-0 left-0 z-99 flex w-screen items-center justify-center border-b px-4 sm:left-1/2 sm:w-fit sm:-translate-x-1/2 sm:items-end sm:border-b-0 sm:bg-transparent">
            {/* Navbar Items */}
            <span className="sm:bg-navbar-bg flex w-full max-w-80 items-center justify-between rounded-full sm:w-80 sm:px-4 sm:py-2">
                <NavbarItem text="Home" icon="home" to="/" />
                <NavbarItem text="Projects" icon="folder_open" to="/projects" />
                <NavbarItem text="Work" icon="work" to="/#work" />
                <NavbarItem text="Blogs" icon="article_person" to="/blogs" />
                <NavbarItem text="Contact" icon="mail" to="/contact" />
            </span>
            {/* Optional floating navbar item, for returning back to all projects/blogs pages */}
            {(location.pathname.includes("/projects/") ||
                location.pathname.includes("/blogs/")) && (
                <span className="bg-navbar-bg absolute -bottom-16 z-90 hidden w-max items-center gap-2 rounded-full p-2 sm:flex">
                    <NavbarItem
                        text={
                            "Return to all" +
                            " " +
                            location.pathname.split("/")[1]
                        }
                        icon="arrow_left_alt"
                        to={"/" + location.pathname.split("/")[1]}
                    />
                </span>
            )}
        </nav>
    );
};

export default Navbar;
