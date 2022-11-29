import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    status: false, 
}
export const popupStateSlices = createSlice({
    name: 'popupState',
    initialState: initialState,
    reducers: {
        getPopupState: (state, action) =>{
            state.status = action.payload
        },
    
    }

})
export const {getPopupState} = popupStateSlices.actions
export default popupStateSlices.reducer