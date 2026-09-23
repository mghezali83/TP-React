import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

function Profile() {
    const loggedUser = useSelector(
        (state: RootState) => state.auth.loggedUser
    );

    if (!loggedUser) {
        return <p>Utilisateur non connecté</p>;
    }

    return (
        <>
            <h1>Mon Profil</h1>

            <img
                src={loggedUser.image}
                alt={loggedUser.username}
                width="150"
            />

            <p>Prénom : {loggedUser.firstName}</p>
            <p>Nom : {loggedUser.lastName}</p>
            <p>Username : {loggedUser.username}</p>
            <p>Email : {loggedUser.email}</p>
            <p>Téléphone : {loggedUser.phone}</p>
            <p>Âge : {loggedUser.age}</p>
        </>
    );
}

export default Profile;