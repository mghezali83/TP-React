import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { User } from '../../types/user'

interface AuthState {
    loggedUser: User | null
}

const initialState: AuthState = {
    loggedUser: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoggedUser: (state, action: PayloadAction<User | null>) => {
            state.loggedUser = action.payload
        },
        clearLoggedUser: (state) => {
            state.loggedUser = null
        }
    },
})

export const { setLoggedUser, clearLoggedUser } = authSlice.actions
export default authSlice.reducer