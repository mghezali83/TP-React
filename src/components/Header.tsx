import { Link } from "react-router-dom";

function Header() {
    return (
        <nav className="Header">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/userList">User List</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
        </nav>
    );
}

export default Header;