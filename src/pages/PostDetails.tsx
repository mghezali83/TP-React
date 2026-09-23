import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Post {
    id: number;
    title: string;
    body: string;
    tags: string[];
    reactions: {
        likes: number;
        dislikes: number;
    };
    views: number;
}

interface Comment {
    id: number;
    body: string;
    postId: number;
    likes: number;
    user: {
        username: string;
    };
}

function PostDetails() {
    const { id } = useParams();

    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        axios
            .get(`https://dummyjson.com/posts/${id}`)
            .then((response) => {
                setPost(response.data);
            });

        axios
            .get(`https://dummyjson.com/comments/post/${id}`)
            .then((response) => {
                setComments(response.data.comments);
            });
    }, [id]);

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
                const comment = {
                    ...response.data,
                    likes: 0,
                    user: {
                        username: "Moi",
                    },
                };

                setComments((previousComments) => [
                    ...previousComments,
                    comment,
                ]);

                setNewComment("");
            });
    }

    if (!post) {
        return <p>Chargement...</p>;
    }

    return (
        <>
            <h1>{post.title}</h1>

            <p>{post.body}</p>

            <p>
                Likes : {post.reactions.likes} | Dislikes :{" "}
                {post.reactions.dislikes}
            </p>

            <p>Vues : {post.views}</p>

            <p>Tags : {post.tags.join(", ")}</p>

            <h2>Commentaires</h2>

            <div>
                <input
                    type="text"
                    placeholder="Écrire un commentaire..."
                    value={newComment}
                    onChange={(event) => {
                        setNewComment(event.target.value);
                    }}
                />

                <button onClick={handleAddComment}>
                    Ajouter
                </button>
            </div>

            {comments.map((comment) => (
                <div key={comment.id}>
                    <p>
                        <strong>{comment.user.username}</strong>
                    </p>

                    <p>{comment.body}</p>

                    <p>Likes : {comment.likes}</p>
                </div>
            ))}
        </>
    );
}

export default PostDetails;