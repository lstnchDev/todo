
import { configureStore } from '@reduxjs/toolkit';
import getTaskSlices from './slices/getTaskSlices'
import getAuthSlices from './slices/getAuthSlices'

export const store = configureStore({
    reducer: {
        getTaskSlices,
        getAuthSlices
    }, 
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware({
        serializableCheck: false
    })
})
