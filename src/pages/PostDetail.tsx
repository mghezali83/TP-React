import { useEffect, useState, type FormEvent } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import type { Comment, CommentsResponse, Post } from "../types/blog";
import {
    addComment,
    removeComment,
    restoreComment,
    setComments,
} from "../store/reducers/blog";

function PostDetail() {
    const { id } = useParams();
    const postId = Number(id);
    const dispatch = useDispatch<AppDispatch>();
    const post = useSelector((state: RootState) => state.blog.posts.find((item) => item.id === postId));
    const comments = useSelector((state: RootState) => state.blog.comments.filter((item) => item.postId === postId));
    const [fetchedPost, setFetchedPost] = useState<Post | null>(null);
    const [commentBody, setCommentBody] = useState("");
    const [loading, setLoading] = useState(!post);
    const [error, setError] = useState("");

    useEffect(() => {
        Promise.all([
            post ? Promise.resolve({ data: post }) : axios.get<Post>(`https://dummyjson.com/posts/${id}`),
            axios.get<CommentsResponse>(`https://dummyjson.com/posts/${id}/comments`),
        ])
            .then(([postResponse, commentsResponse]) => {
                setFetchedPost(postResponse.data);
                dispatch(setComments(commentsResponse.data.comments));
            })
            .catch(() => setError("Impossible de charger cet article."))
            .finally(() => setLoading(false));
    }, [dispatch, id, post]);

    const displayedPost = post || fetchedPost;

    async function handleAddComment(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!commentBody.trim()) return;

        const optimisticComment: Comment = {
            id: -Date.now(),
            body: commentBody.trim(),
            postId,
            likes: 0,
            user: { id: 1, username: "vous", fullName: "Vous" },
        };

        dispatch(addComment(optimisticComment));
        setCommentBody("");

        try {
            await axios.post("https://dummyjson.com/comments/add", {
                body: optimisticComment.body,
                postId,
                userId: 1,
            });
        } catch {
            dispatch(removeComment(optimisticComment.id));
            setError("Le commentaire n’a pas pu être simulé.");
        }
    }

    async function handleDeleteComment(comment: Comment) {
        dispatch(removeComment(comment.id));

        try {
            await axios.delete(`https://dummyjson.com/comments/${comment.id}`);
        } catch {
            dispatch(restoreComment(comment));
            setError("La suppression n’a pas pu être simulée.");
        }
    }

    if (loading) return <p className="status-message">Chargement de l’article...</p>;
    if (error && !displayedPost) return <p className="status-message error-message">{error}</p>;
    if (!displayedPost) return <p className="status-message">Article introuvable.</p>;

    return (
        <main className="post-detail">
            <Link to="/posts" className="back-link">Retour au blog</Link>
            <article>
                <p className="eyebrow">Article #{displayedPost.id}</p>
                <h1>{displayedPost.title}</h1>
                <div className="post-metrics detail-metrics">
                    <span>👍 {displayedPost.reactions.likes}</span>
                    <span>👎 {displayedPost.reactions.dislikes}</span>
                    <span>👁 {displayedPost.views}</span>
                </div>
                <p className="post-body">{displayedPost.body}</p>
            </article>

            <section className="comments-section">
                <h2>Commentaires ({comments.length})</h2>
                <form className="comment-form" onSubmit={handleAddComment}>
                    <textarea
                        value={commentBody}
                        onChange={(event) => setCommentBody(event.target.value)}
                        placeholder="Ajouter un commentaire..."
                        aria-label="Commentaire"
                        rows={3}
                    />
                    <button type="submit">Commenter</button>
                </form>
                {error && <p className="error-message">{error}</p>}
                <div className="comments-list">
                    {comments.map((comment) => (
                        <article className="comment" key={comment.id}>
                            <div>
                                <strong>{comment.user.fullName || comment.user.username}</strong>
                                <p>{comment.body}</p>
                                <span>👍 {comment.likes}</span>
                            </div>
                            <button type="button" className="delete-button" onClick={() => handleDeleteComment(comment)}>
                                Supprimer
                            </button>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    );
}

export default PostDetail;