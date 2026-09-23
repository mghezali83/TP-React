import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { User as UserType } from "../types/user";

function User() {
    const { id } = useParams();
    const [user, setUser] = useState<UserType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get<UserType>(
                    `https://dummyjson.com/users/${id}`
                );

                setUser(response.data);
            } catch {
                setError("Profil introuvable.");
            } finally {
                setLoading(false);
            }
        })();
    }, [id]);

    if (loading) {
        return <p className="status-message">Chargement du profil...</p>;
    }

    if (error || !user) {
        return (
            <main className="status-message error-message">
                <p>{error || "Profil introuvable."}</p>
                <Link to="/userList">Retour aux utilisateurs</Link>
            </main>
        );
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