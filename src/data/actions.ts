import { FilterTypes } from './types';
export enum ActionTypes {
    CREATE,
    TOGGLE,
    REMOVE,
    CHANGE_FILTER,
    DELETE_ALL
}

export type Action = {
    type:ActionTypes,
    payload?:number|string|FilterTypes
}
export function addAction(title:string): Action{
    return {
        type:ActionTypes.CREATE,
        payload:title
    }
}

export function removeAction(id:number): Action{
    return {
        type:ActionTypes.REMOVE,
        payload:id
    }
}

export function toggleAction(id:number): Action{
    return {
        type:ActionTypes.TOGGLE,
        payload:id
    }
}

export function setFilter(filter:FilterTypes): Action{
    return {
        type:ActionTypes.CHANGE_FILTER,
        payload:filter
    }
}

export function createDeleteAll(filter:FilterTypes): Action{
    return {
        type:ActionTypes.DELETE_ALL,
        payload:filter
    }
}
