import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const removeUser = createAsyncThunk('users/delete', async (user, { rejectWithValue }) => {
    try {
        await axios.delete(`http://localhost:3005/users/${user.id}`)
        return user
    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response.data);
    }
})

export { removeUser }