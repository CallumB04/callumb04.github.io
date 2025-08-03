import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="project-navbar">
            <Link to="/">
                <i className="fa fa-house"></i>
            </Link>
        </nav>
    );
};

export default Navbar;
