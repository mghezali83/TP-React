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

function Post() {
    const { id } = useParams();
    const [post, setPost] = useState<Post | null>(null);

    useEffect(() => {
        axios
            .get(`https://dummyjson.com/posts/${id}`)
            .then((response) => {
                setPost(response.data);
            });
    }, [id]);

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
        </>
    );
}

export default Post;