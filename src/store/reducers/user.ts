import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { User } from '../../types/user'

interface UserState {
    users: User[]
    currentUser: User | null
}

const initialState: UserState = {
    users: [],
    currentUser: null,
}

export const usersSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload
        },

        setCurrentUser: (state, action: PayloadAction<User | null>) => {
            state.currentUser = action.payload
        },

        logout: (state) => {
            state.currentUser = null
        },
    },
})

export const { setUsers, setCurrentUser, logout } = usersSlice.actions

export default usersSlice.reducer