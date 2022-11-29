
import { configureStore } from '@reduxjs/toolkit';
import getProcessTaskSlices from './slices/getProcessTaskSlices'
import filesSlices from './slices/filesSlices'

export const store = configureStore({
    reducer: {
        getProcessTaskSlices,
        filesSlices
    }
})
