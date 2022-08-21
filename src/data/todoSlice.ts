import { createSlice } from '@reduxjs/toolkit';
import { createItem, removeItem, toggleItem, deleteAll } from '../utils/functions';
import { StateType } from './reducers';
import { FilterTypes, Action } from './types';

const initialState:StateType = {
    activeFilter:FilterTypes.ALL,
    todoItems:[]
}

export const todoSlice = createSlice({
    name:'todo',
    initialState,
    reducers:{
        add:(state:StateType,action)=>{
            state.todoItems = [...state.todoItems,createItem(state.todoItems,action.payload as string)]
        },
        remove:(state,action)=>{
            state.todoItems = removeItem(state.todoItems, action.payload as number);
        },
        toggle:(state,action)=>{
            state.todoItems = toggleItem(state.todoItems, action.payload as number);
        },
        deleteAllItems:(state,action)=>{
            state.todoItems = deleteAll(state.todoItems,action.payload as FilterTypes)
        },
        changeFilter:(state,action)=>{
            state.activeFilter = action.payload as FilterTypes
        }
    }
});

export const {add, remove, toggle, deleteAllItems, changeFilter} = todoSlice.actions;
export default todoSlice.reducer;