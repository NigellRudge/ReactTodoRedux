import React from "react"
import { useDispatch } from 'react-redux';
import { removeAction } from "../data/actions";

interface IProps {
    id:number
}
const DeleteIcon = ({id}:IProps)=>{
    const dispatch = useDispatch();
    const click = ()=>{
        dispatch(removeAction(id))
      }
    return (
        <div onClick={click} className=" mx-0.5 bg-red-400 p-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
        </div>
    )
}

export default DeleteIcon;