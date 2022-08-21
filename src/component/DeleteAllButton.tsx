import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { StateType } from "../data/reducers";
import { filterItems } from "../utils/functions";
import { deleteAllItems } from "../data/todoSlice";

const DeleteAllButton = ()=>{
    const [color, setColor] = useState<string>('text-gray-400')
    const dispatch = useDispatch()
    const activeFilter = useSelector((state:StateType)=>{
        return state.activeFilter
    })
    const render = useSelector((state:StateType)=>{
        return filterItems(state.todoItems,activeFilter).length > 0;
    })
    const click = ()=>{
        return dispatch(deleteAllItems(activeFilter))
    }

    const onBeginHover = ()=>{
        setColor('text-red-400')
    }

    const onStopHover = ()=>{
        setColor('text-gray-400')
    }
    if(!render){
        return <div className="w-2/5 h-12"/>
    }
    return(
    <div className='flex flex-row p-2 w-2/5 h-12 cursor-pointer' onMouseEnter={onBeginHover} onMouseLeave={onStopHover} onClick={click}>
        <svg xmlns="http://www.w3.org/2000/svg" className={"h-5 w-5 "+ color } viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        <span className={ color +' text-sm ml-1 font-semibold'}>Delete {activeFilter}</span>
    </div>
    );
}

export default DeleteAllButton;