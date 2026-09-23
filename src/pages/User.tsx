import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { User as UserType } from "../types/user";

function User() {
    const { id } = useParams();
    const [user, setUser] = useState<UserType | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get<UserType>(
                    `https://dummyjson.com/users/${id}`
                );

                setUser(response.data);
            } catch (e) {
                console.error(e);
            }
        })();
    }, [id]);

    if (!user) {
        return <p>Chargement...</p>;
    }

    return (
        <div>
            <h1>
                {user.firstName} {user.lastName}
            </h1>

            <img src={user.image} alt={user.firstName} width="200" />

            <p>Username : {user.username}</p>
            <p>Email : {user.email}</p>
            <p>Téléphone : {user.phone}</p>
            <p>Age : {user.age}</p>
            <p>Date de naissance : {user.birthDate}</p>
            <p>Genre : {user.gender}</p>

            <h2>Adresse</h2>

            <p>Adresse : {user.address?.address}</p>
            <p>Ville : {user.address?.city}</p>
            <p>Code postal : {user.address?.postalCode}</p>
            <p>Pays : {user.address?.country}</p>

            <h2>Entreprise</h2>

            <p>Entreprise : {user.company?.name}</p>
            <p>Département : {user.company?.department}</p>
            <p>Poste : {user.company?.title}</p>
        </div>
    );
}

export default User;