import { createSlice } from "@reduxjs/toolkit";


export const fetchTask = createAsyncThunk('setTask/fetchTask', async(params)=>{

    const {user_id, token_id} = params

    const response = await axios.get(
        `https://api.twitch.tv/helix/users/follows?first=100&from_id=${user_id}`,{
            headers: {
                'Authorization': `Bearer ${token_id}`,
                'Client-Id': CLIENT_ID,
            }
        })
    return response.data.data as AllFollowsItem[]
})

const initialState = {
    items:[], 
    status: "loading"
}

export const setTaskSlices = createSlice({
    name: 'setTask',
    initialState: initialState,
    reducers: {
        setTask: (state, action) =>{
            state.items = [
                ...state.items,
                action.payload
            ]
        }
    }

})