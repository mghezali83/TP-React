import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { clearLoggedUser } from "../store/reducers/auth";

function Header() {
    const loggedUser = useSelector(
        (state: RootState) => state.auth.loggedUser
    );

    const dispatch = useDispatch();

    function handleLogout() {
        localStorage.removeItem("token");
        dispatch(clearLoggedUser());
    }

    return (
        <header>
            <nav>
                <Link to="/">Home</Link>
                {" | "}
                <Link to="/userList">User List</Link>
                {" | "}

                {loggedUser ? (
                    <>
                        <Link to="/profile">Mon Profil</Link>
                        {" | "}
                        <Link to="/favoris">Mes Favoris</Link>
                        {" | "}
                        <span>Bonjour {loggedUser.firstName}</span>
                        {" | "}
                        <button onClick={handleLogout}>
                            Déconnexion
                        </button>
                    </>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </nav>
        </header>
    );
}

export default Header;