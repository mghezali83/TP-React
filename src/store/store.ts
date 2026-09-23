import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/user'
import authReducer from './reducers/auth'
import loadingReducer from './reducers/loading'
import blogReducer from './reducers/blog'

export const store = configureStore({
    reducer: {
        user: userReducer,
        auth: authReducer,
        loading: loadingReducer,
        blog: blogReducer,
    },
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']