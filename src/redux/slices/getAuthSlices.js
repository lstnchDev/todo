import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    uId: null
}
export const getAuthSlices = createSlice({
    name: 'getProcessTask',
    initialState: initialState,
    reducers: {
        getUid: (state, action) =>{
            state.uId = action.payload
        },
    
    }

})
export const {getUid} = getAuthSlices.actions
export default getAuthSlices.reducer