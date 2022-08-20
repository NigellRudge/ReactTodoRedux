import {FilterTypes, Todo} from './types';

type StateType = {
    activeFilter:FilterTypes,
    todoItems: Todo[],
}