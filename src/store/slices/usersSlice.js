import { createSlice } from "@reduxjs/toolkit"
import { fetchUsers } from "../thunks/fetchUsers"
import { addUsers } from "../thunks/addUsers"
import { removeUser } from "../thunks/removeUser"

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        data: [],
        isLoading: false,
        error: null,
    },
    extraReducers(builder) {
        //FETCH
        builder.addCase(fetchUsers.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload
        })
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error
        })
        //ADD
        builder.addCase(addUsers.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(addUsers.fulfilled, (state, action) => {
            state.isLoading = false
            state.data.push(action.payload)
        })
        builder.addCase(addUsers.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error
        })
        //DELETE
        builder.addCase(removeUser.pending, (state, action) => {
            state.isLoading = true
            state.error = null;
        })
        builder.addCase(removeUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = state.data.filter((user) => user.id !== action.payload);
        })
        builder.addCase(removeUser.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error
        })
    }
})

export const usersReducer = usersSlice.reducer
