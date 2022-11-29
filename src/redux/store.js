
import { configureStore } from '@reduxjs/toolkit';
import getProcessTaskSlices from './slices/getProcessTaskSlices'
import getAuthSlices from './slices/getAuthSlices'

export const store = configureStore({
    reducer: {
        getProcessTaskSlices,
        getAuthSlices
    }
})
