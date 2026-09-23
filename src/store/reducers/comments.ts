import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Comment {
    id: number;
    body: string;
    postId: number;
    likes: number;
    user: {
        username: string;
    };
}

interface CommentsState {
    comments: Comment[];
}

const initialState: CommentsState = {
    comments: [],
};

const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        setComments: (state, action: PayloadAction<Comment[]>) => {
            state.comments = action.payload;
        },

        addComment: (state, action: PayloadAction<Comment>) => {
            state.comments.push(action.payload);
        },

        removeComment: (state, action: PayloadAction<number>) => {
            state.comments = state.comments.filter(
                (comment) => comment.id !== action.payload
            );
        },
    },
});

export const {
    setComments,
    addComment,
    removeComment,
} = commentsSlice.actions;

export default commentsSlice.reducer;