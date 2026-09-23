import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Comment, Post } from "../../types/blog";

interface BlogState {
    posts: Post[];
    comments: Comment[];
}

const initialState: BlogState = {
    posts: [],
    comments: [],
};

export const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {
        setPosts: (state, action: PayloadAction<Post[]>) => {
            state.posts = action.payload;
        },
        setComments: (state, action: PayloadAction<Comment[]>) => {
            state.comments = action.payload;
        },
        addPost: (state, action: PayloadAction<Post>) => {
            state.posts.unshift(action.payload);
        },
        removePost: (state, action: PayloadAction<number>) => {
            state.posts = state.posts.filter((post) => post.id !== action.payload);
            state.comments = state.comments.filter((comment) => comment.postId !== action.payload);
        },
        restorePost: (state, action: PayloadAction<{ post: Post; comments: Comment[] }>) => {
            state.posts.unshift(action.payload.post);
            state.comments.push(...action.payload.comments);
        },
        addComment: (state, action: PayloadAction<Comment>) => {
            state.comments.push(action.payload);
        },
        removeComment: (state, action: PayloadAction<number>) => {
            state.comments = state.comments.filter((comment) => comment.id !== action.payload);
        },
        restoreComment: (state, action: PayloadAction<Comment>) => {
            state.comments.push(action.payload);
        },
    },
});

export const {
    setPosts,
    setComments,
    addPost,
    removePost,
    restorePost,
    addComment,
    removeComment,
    restoreComment,
} = blogSlice.actions;

export default blogSlice.reducer;