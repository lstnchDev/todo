import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    items:[], 
    status: "loading"
}
export const getProcessTaskSlices = createSlice({
    name: 'getProcessTask',
    initialState: initialState,
    reducers: {
        getTasks: (state, action) =>{
            state.items = action.payload
            console.log(state.items)
        },
    
    }

})
export const {getTasks} = getProcessTaskSlices.actions
export default getProcessTaskSlices.reducer