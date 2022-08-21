import { configureStore } from "@reduxjs/toolkit";
import todoSlice from './todoSlice';
import todoReducer from './todoSlice';

export default configureStore({
    reducer:{
        todo: todoReducer
    }
})