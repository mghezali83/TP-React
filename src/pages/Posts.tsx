import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "../store/store";
import {
    setPosts,
    removePost,
} from "../store/reducers/posts";

function Posts() {
    const dispatch = useDispatch();

    const posts = useSelector(
        (state: RootState) => state.posts.posts
    );

    const loggedUser = useSelector(
        (state: RootState) => state.auth.loggedUser
    );

    useEffect(() => {
        if (posts.length === 0) {
            axios
                .get("https://dummyjson.com/posts")
                .then((response) => {
                    dispatch(setPosts(response.data.posts));
                });
        }
    }, [dispatch, posts.length]);

    function handleDelete(postId: number) {
        const oldPosts = [...posts];

        dispatch(removePost(postId));

        axios
            .delete(`https://dummyjson.com/posts/${postId}`)
            .catch(() => {
                dispatch(setPosts(oldPosts));
            });
    }

    return (
        <>
            <h1>Blog</h1>

            {loggedUser && (
                <Link to="/posts/create">
                    <button>Créer un article</button>
                </Link>
            )}

            {posts.map((post) => (
                <div key={post.id}>
                    <h2>{post.title}</h2>

                    <p>{post.body}</p>

                    <p>
                        Likes : {post.reactions.likes} | Dislikes :{" "}
                        {post.reactions.dislikes}
                    </p>

                    <p>Vues : {post.views}</p>

                    <p>Tags : {post.tags.join(", ")}</p>

                    <Link to={`/posts/${post.id}`}>
                        Voir l'article
                    </Link>

                    {loggedUser && (
                        <>
                            <br />

                            <button
                                onClick={() => handleDelete(post.id)}
                            >
                                Supprimer
                            </button>
                        </>
                    )}
                </div>
            ))}
        </>
    );
}

export default Posts;