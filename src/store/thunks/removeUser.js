import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const removeUser = createAsyncThunk('users/delete', async (userId, { rejectWithValue }) => {
    try {
        await axios.delete(`http://localhost:3005/users/${userId}`)
        return userId
    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response.data);
    }
})

export { removeUser }