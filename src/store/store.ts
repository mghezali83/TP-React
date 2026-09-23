import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user";
import authReducer from "./reducers/auth";
import loadingReducer from "./reducers/loading";
import favoritesReducer from "./reducers/favorites";
import commentsReducer from "./reducers/comments";

export const store = configureStore({
    reducer: {
        user: userReducer,
        auth: authReducer,
        loading: loadingReducer,
        favorites: favoritesReducer,
        comments: commentsReducer,
    },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];