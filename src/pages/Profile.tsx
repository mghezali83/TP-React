import { useParams } from "react-router-dom";
import usersData from "../data/users.json";
import NotFound from "./NotFound";

function Profile() {
    let { id } = useParams();

    let user = usersData.users.find((user) => {
        return user.id.toString() === id;
    });

    if (!user) {
        return <NotFound />;
    }

    return (
        <>
            <div className="Profile">
                <h1>{user?.firstName} {user?.lastName}</h1>
                <img src={user.image} />

                <ul>
                    <li>Username : {user.username}</li>
                    <li>Email : {user.email}</li>
                    <li>Téléphone : {user.phone}</li>
                    <li>Age : {user.age}</li>
                    <li>Genre : {user.gender}</li>
                    <li>Date de naissance : {user.birthDate}</li>
                    <li>Rôle : {user.role}</li>
                </ul>

                <h2>Adresse</h2>
                <ul>
                    <li>Adresse : {user.address.address}</li>
                    <li>Ville : {user.address.city}</li>
                    <li>Code postal : {user.address.postalCode}</li>
                    <li>Pays : {user.address.country}</li>
                </ul>

                <h2>Entreprise</h2>
                <ul>
                    <li>Nom : {user.company.name}</li>
                    <li>Département : {user.company.department}</li>
                    <li>Poste : {user.company.title}</li>
                </ul>
            </div>
        </>
    );
}

export default Profile;