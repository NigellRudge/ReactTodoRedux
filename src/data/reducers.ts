import {FilterTypes, Todo} from './types';
import { Action, ActionTypes } from './actions';
import { createItem, deleteAll, removeItem, toggleItem } from '../utils/functions';

export type StateType = {
    activeFilter:FilterTypes,
    todoItems: Todo[],
}


const initialState:StateType = {
    activeFilter:FilterTypes.ALL,
    todoItems: []
}

export default function todoReducer(state:StateType=initialState, action:Action){
    switch(action.type){
        case ActionTypes.CREATE:{
            let temp = [...state.todoItems,createItem(state.todoItems,action.payload as string)]
            return {...state,todoItems:temp};
        }
        case ActionTypes.REMOVE:{
            let temp = removeItem(state.todoItems, action.payload as number);
            return {...state, todoItems:temp};
        }
        case ActionTypes.TOGGLE:{
            let temp = toggleItem(state.todoItems, action.payload as number);
            return {...state,todoItems:temp};
        }
        case ActionTypes.CHANGE_FILTER:{
            let filter = action.payload as FilterTypes
            return {...state,activeFilter:filter};
        }
        case ActionTypes.DELETE_ALL:{
            let temp = deleteAll(state.todoItems,action.payload as FilterTypes)
            return {...state, todoItems:temp};
        }
        default:{
            return state;
        }
    }
}