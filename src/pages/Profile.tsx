import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

function Profile() {
    const loggedUser = useSelector(
        (state: RootState) => state.auth.loggedUser
    );

    const users = useSelector(
        (state: RootState) => state.user.users
    );

    if (!loggedUser) {
        return <p>Utilisateur non connecté</p>;
    }

    const user = users.find(
        (user) => user.id === loggedUser.id
    );

    if (!user) {
        return <p>Chargement du profil...</p>;
    }

    return (
        <>
            <h1>Mon Profil</h1>

            <div className="profile">
                <div className="profile-image">
                    <img
                        src={user.image}
                        alt={user.username}
                    />
                </div>

                <div className="profile-info">
                    <p>Prénom : {user.firstName}</p>
                    <p>Nom : {user.lastName}</p>
                    <p>Username : {user.username}</p>
                    <p>Email : {user.email}</p>
                    <p>Téléphone : {user.phone}</p>
                    <p>Âge : {user.age}</p>
                </div>
            </div>
        </>
    );
}

export default Profile;