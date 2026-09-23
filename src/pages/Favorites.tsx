import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { RootState } from "../store/store";

function Favorites() {
    const favorites = useSelector(
        (state: RootState) => state.favorites.favorites
    );

    return (
        <>
            <h1>Mes Favoris</h1>

            <p>Nombre de favoris : {favorites.length}</p>

            {favorites.map((id) => (
                <div key={id}>
                    <Link to={`/recipes/${id}`}>
                        Recette {id}
                    </Link>
                </div>
            ))}
        </>
    );
}

export default Favorites;