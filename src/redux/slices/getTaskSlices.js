import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    items:[], 
}
export const getTaskSlices = createSlice({
    name: 'getProcessTask',
    initialState: initialState,
    reducers: {
        getTasks: (state, action) =>{
            state.items = action.payload
        }
    }

})
export const {getTasks} = getTaskSlices.actions
export default getTaskSlices.reducer