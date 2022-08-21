import React from "react";
import { useDispatch } from "react-redux";
import { toggleAction } from "../data/actions";

interface IProps {
    completed: boolean,
    id:number
}

const StatusIcon = ({completed,id}:IProps)=>{
    const dispatch = useDispatch();
    const click = ()=>{
        dispatch(toggleAction(id))
    }

    if(completed){
        return ( 
            <div onClick={click} className=" mx-0.5 p-2 rounded-lg bg-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-200" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
            </div>
        )
    }
    else {
        return (
            <div  onClick={click}  className=" mx-0.5 bg-gray-200 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
            </div>
        )
    }
} 

export default StatusIcon;