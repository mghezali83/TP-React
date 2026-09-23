import { useEffect, useState, type FormEvent } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import type { Post, PostsResponse, CommentsResponse } from "../types/blog";
import {
    addPost,
    removePost,
    restorePost,
    setComments,
    setPosts,
} from "../store/reducers/blog";

function Blog() {
    const dispatch = useDispatch<AppDispatch>();
    const posts = useSelector((state: RootState) => state.blog.posts);
    const comments = useSelector((state: RootState) => state.blog.comments);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        Promise.all([
            axios.get<PostsResponse>("https://dummyjson.com/posts"),
            axios.get<CommentsResponse>("https://dummyjson.com/comments"),
        ])
            .then(([postsResponse, commentsResponse]) => {
                dispatch(setPosts(postsResponse.data.posts));
                dispatch(setComments(commentsResponse.data.comments));
            })
            .catch(() => setError("Impossible de charger les articles."))
            .finally(() => setLoading(false));
    }, [dispatch]);

    async function handleCreatePost(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!title.trim() || !body.trim()) return;

        const optimisticPost: Post = {
            id: -Date.now(),
            title: title.trim(),
            body: body.trim(),
            tags: ["nouveau"],
            reactions: { likes: 0, dislikes: 0 },
            views: 0,
            userId: 1,
        };

        dispatch(addPost(optimisticPost));
        setTitle("");
        setBody("");

        try {
            await axios.post("https://dummyjson.com/posts/add", {
                title: optimisticPost.title,
                body: optimisticPost.body,
                userId: optimisticPost.userId,
            });
        } catch {
            dispatch(removePost(optimisticPost.id));
            setError("La publication n’a pas pu être simulée.");
        }
    }

    async function handleDeletePost(post: Post) {
        const postComments = comments.filter((comment) => comment.postId === post.id);
        dispatch(removePost(post.id));

        try {
            await axios.delete(`https://dummyjson.com/posts/${post.id}`);
        } catch {
            dispatch(restorePost({ post, comments: postComments }));
            setError("La suppression n’a pas pu être simulée.");
        }
    }

    return (
        <main className="blog-page">
            <div className="page-heading">
                <p className="eyebrow">Le journal de la communauté</p>
                <h1>Blog</h1>
                <p>Découvrez les dernières publications et partagez vos idées.</p>
            </div>

            <form className="post-form" onSubmit={handleCreatePost}>
                <h2>Publier un article</h2>
                <input
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="Titre de l’article"
                    aria-label="Titre de l’article"
                />
                <textarea
                    value={body}
                    onChange={(event) => setBody(event.target.value)}
                    placeholder="Écrivez votre article..."
                    aria-label="Contenu de l’article"
                    rows={4}
                />
                <button type="submit">Publier</button>
            </form>

            {error && <p className="status-message error-message">{error}</p>}
            {loading && <p className="status-message">Chargement des articles...</p>}

            {!loading && (
                <div className="posts-grid">
                    {posts.map((post) => (
                        <article className="post-card" key={post.id}>
                            <div className="post-card-topline">
                                <span className="post-id">#{post.id}</span>
                                <button type="button" className="delete-button" onClick={() => handleDeletePost(post)}>
                                    Supprimer
                                </button>
                            </div>
                            <h2>{post.title}</h2>
                            <p className="post-excerpt">{post.body}</p>
                            <div className="post-tags">
                                {post.tags.map((tag) => <span key={tag}>#{tag}</span>)}
                            </div>
                            <div className="post-metrics">
                                <span>👍 {post.reactions.likes}</span>
                                <span>👎 {post.reactions.dislikes}</span>
                                <span>👁 {post.views}</span>
                            </div>
                            <Link className="read-link" to={`/posts/${post.id}`}>Lire l’article</Link>
                        </article>
                    ))}
                </div>
            )}
        </main>
    );
}

export default Blog;