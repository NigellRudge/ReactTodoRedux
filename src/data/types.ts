import {ActionTypes} from './actions';

export type Action = {
    type:ActionTypes,
    payload?: number | FilterTypes
}

export type Todo = {
    id:number,
    title:string,
    completed:boolean,
    color:string
}

export enum FilterTypes {
    ALL='All',
    PENDING='Pending',
    COMPLETED='Completed'
}