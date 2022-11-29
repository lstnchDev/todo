import { compose, createSlice } from "@reduxjs/toolkit";


const initialState = {
   files: {

   }
    
}
export const filesSlices = createSlice({
    name: 'files',
    initialState: initialState,
    reducers: {
        getFiles: (state, action) =>{
            const id = (action.payload.id)
            console.log(action.payload)
            state.files = {
                ...state.files,
                
                ...action.payload
            }
        },
    
    }

})
export const {getFiles} = filesSlices.actions
export default filesSlices.reducer