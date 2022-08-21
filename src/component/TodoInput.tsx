import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { addAction } from "../data/actions";

const TodoInput = ()=>{
    const [title, setTilte] = useState<string>('')
    const dispatch = useDispatch()

    const onTextChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
        let value = event.currentTarget.value;
        setTilte(value)
    }
    const handler = ()=>{
      dispatch(addAction(title))
      setTilte('');
    }

    useEffect(()=>{
      const captureKeyBoardEvent = (event: KeyboardEvent)=>{
        if(event.key === 'Enter'){
          if(title.length >= 4){
            handler();
          }
        }
        if(event.key === 'Escape'){
          setTilte('');
        }
      }

      document.addEventListener('keydown', captureKeyBoardEvent)
      return(()=>{
        document.removeEventListener('keydown',captureKeyBoardEvent);
      })
    })
    
    return (
        <div className='flex flex-row px-2 py-2 h-20 items-center'>
          <input value={title} onChange={onTextChange} placeholder='Add todo title' type="text" name="" id="" className="w-4/5 h-10 px-2 rounded-lg bg-blue-100" />
          <AddButton active={title.length >=4} click={handler} />
        </div>
    );
}
export default TodoInput;

interface ButtonProps {
  active:boolean,
  click: ()=>void
}

const AddButton = ({active, click}:ButtonProps)=>{
  const color = active ? "bg-blue-500":"bg-blue-300";
  return (
    <button disabled={!active} onClick={click} className={'p-2 justify-center flex flex-row rounded-lg w-1/5 h-10 ml-1 ' + color}>
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          </span>
        <span className='text-gray-100 font-bold'>Add</span>
    </button>
  )
}