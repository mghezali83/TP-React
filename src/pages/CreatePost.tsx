import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addPost } from "../store/reducers/posts";

function CreatePost() {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [error, setError] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (title.trim() === "" || body.trim() === "") {
            setError("Veuillez remplir tous les champs.");
            return;
        }

        axios
            .post("https://dummyjson.com/posts/add", {
                title: title,
                body: body,
                userId: 1,
            })
            .then((response) => {
                dispatch(
                    addPost({
                        ...response.data,
                        tags: [],
                        reactions: {
                            likes: 0,
                            dislikes: 0,
                        },
                        views: 0,
                    })
                );

                navigate("/posts");
            })
            .catch(() => {
                setError("Une erreur est survenue.");
            });
    }

    return (
        <>
            <h1>Créer un article</h1>

            {error && <p>{error}</p>}

            <form onSubmit={handleSubmit}>
                <div>
                    <p>Titre</p>

                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Titre de l'article"
                    />
                </div>

                <div>
                    <p>Contenu</p>

                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder="Contenu de l'article"
                    />
                </div>

                <button type="submit">
                    Publier
                </button>
            </form>
        </>
    );
}

export default CreatePost;