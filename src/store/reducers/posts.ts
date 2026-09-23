import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

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

interface PostsState {
    posts: Post[];
}

const initialState: PostsState = {
    posts: [],
};

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setPosts: (state, action: PayloadAction<Post[]>) => {
            state.posts = action.payload;
        },

        addPost: (state, action: PayloadAction<Post>) => {
            state.posts.push(action.payload);
        },

        removePost: (state, action: PayloadAction<number>) => {
            state.posts = state.posts.filter(
                (post) => post.id !== action.payload
            );
        },
    },
});

export const { setPosts, addPost, removePost } = postsSlice.actions;

export default postsSlice.reducer;