import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import type { RootState } from "../store/store";
import {
    setComments,
    addComment,
    removeComment,
} from "../store/reducers/comments";

function PostDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const posts = useSelector((state: RootState) => state.posts.posts);
    const comments = useSelector(
        (state: RootState) => state.comments.comments
    );

    const [post, setPost] = useState<any>(null);
    const [newComment, setNewComment] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const postFromRedux = posts.find(
            (post) => post.id === Number(id)
        );

        if (postFromRedux) {
            setPost(postFromRedux);
            return;
        }

        axios
            .get(`https://dummyjson.com/posts/${id}`)
            .then((response) => {
                setPost(response.data);
            })
            .catch(() => {
                setError("Article introuvable");
            });
    }, [id, posts]);

    useEffect(() => {
        if (!id) {
            return;
        }

        axios
            .get(`https://dummyjson.com/comments/post/${id}`)
            .then((response) => {
                dispatch(setComments(response.data.comments));
            });
    }, [id, dispatch]);

    function handleAddComment() {
        if (newComment.trim() === "") {
            return;
        }

        axios
            .post("https://dummyjson.com/comments/add", {
                body: newComment,
                postId: Number(id),
                userId: 1,
            })
            .then((response) => {
                dispatch(
                    addComment({
                        ...response.data,
                        likes: 0,
                        user: {
                            username: "Moi",
                        },
                    })
                );

                setNewComment("");
            });
    }

    function handleDeleteComment(commentId: number) {
        const oldComments = [...comments];

        dispatch(removeComment(commentId));

        axios
            .delete(`https://dummyjson.com/comments/${commentId}`)
            .catch(() => {
                dispatch(setComments(oldComments));
            });
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!post) {
        return <p>Chargement...</p>;
    }

    return (
        <>
            <Link to="/posts">Retour aux articles</Link>

            <h1>{post.title}</h1>

            <p>{post.body}</p>

            <p>
                Likes : {post.reactions?.likes ?? 0} | Dislikes :{" "}
                {post.reactions?.dislikes ?? 0}
            </p>

            <p>Vues : {post.views ?? 0}</p>

            <p>
                Tags : {post.tags?.join(", ") ?? ""}
            </p>

            <h2>Commentaires</h2>

            {comments
                .filter((comment) => comment.postId === Number(id))
                .map((comment) => (
                    <div key={comment.id}>
                        <p>{comment.body}</p>

                        <p>
                            Par : {comment.user.username}
                        </p>

                        <button
                            onClick={() =>
                                handleDeleteComment(comment.id)
                            }
                        >
                            Supprimer
                        </button>
                    </div>
                ))}

            <h3>Ajouter un commentaire</h3>

            <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Votre commentaire"
            />

            <br />

            <button onClick={handleAddComment}>
                Ajouter
            </button>
        </>
    );
}

export default PostDetails;