import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const fetchUsers = createAsyncThunk('users/fetch', async () => {
    const response = await axios.get('http://localhost:3005/users')

    //DEV ONLY
    await pause(1300)
    
    return response.data
})
//This cAT assign automatically the 3 different states of the requests
//after the string first parameter like: users/fetch/pending
//The data will be automatically assigned to the payload property of the
//fulfilled action type 

//DEV ONLY
const pause = (duration) => {
    return new Promise ((resolve) => {
        setTimeout(resolve, duration);
    })
}

export { fetchUsers }