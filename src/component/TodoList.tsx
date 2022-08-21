import React,{useCallback, useEffect} from "react";
import { Todo, FilterTypes } from '../data/types';
import DeleteIcon from './DeleteIcon';
import StatusIcon from "./StatusIcon";
import { useSelector, useDispatch, connect } from 'react-redux';
import { StateType } from '../data/reducers';
import { setFilter } from "../data/actions";
import { filterItems } from "../utils/functions";

interface ListProps {
    items:Todo[]
}
interface ItemProps {
    item: Todo
}

export const TodoList = ({items}:ListProps)=>{ 
    return (
        <div className="flex flex-col h-full overflow-hidden">
            <FilterRow />
            <div className='flex flex-col px-2 py-1 overflow-y-auto'>
                {items.map((item, index)=>{
                    return <Item item={item} key={(index + item.id).toString()} />
                })}

            </div>
        </div>
    )
}


const Item = ({item}: ItemProps)=>{
    const statusTextStyles =item.completed ? 'text-green-500':'text-gray-400';
    const statusText = item.completed ? "Done" : "Pending";
    const titleDecorationStyle = item.completed ? 'line-through italic':'';
    return (
        <div className="shrink-0 h-20 min w-100 mb-1.5">
            <div className={ item.color+ ' shadow-sm flex border-l-4 flex-row items-center py-2 h-full w-full  px-1 border-gray-200 border border-solid rounded-lg bg-white'}>
                <div className='flex flex-col w-10/12'>
                    <span className={"text-base font-semibold text-gray-500 "+ titleDecorationStyle}>{item.title}</span>
                    <span className='text-xs text-gray-400'>Status: 
                        <span className={statusTextStyles + ' ml-1 font-semibold'}>{statusText}</span>
                    </span>
                </div>
                <div className="flex flex-row justify-center items-center h-100 w-2/12">
                    <StatusIcon id={item.id} completed={item.completed}/>
                    <DeleteIcon id={item.id} />
                </div>
            </div>
        </div>
    )
}

const FilterRow = ()=>{
    const activeFilter = useSelector((state:StateType)=>{
        return state.activeFilter
    })
    const dispatch = useDispatch();
    const changeFilter = useCallback( 
        (newFilter:FilterTypes)=>{
        dispatch(setFilter(newFilter))
      },[dispatch]
    )
    useEffect(()=>{
        const setupKeyBoardEvent = (event:KeyboardEvent)=>{  
            let key = event.key  
                if(key === 'ArrowLeft'){
                    switch(activeFilter){
                        case FilterTypes.ALL:{                                             
                            return;
                        }
                        case FilterTypes.PENDING:{   
                            changeFilter(FilterTypes.ALL);
                            return;
                        }
                        case FilterTypes.COMPLETED:{
                            changeFilter(FilterTypes.PENDING);
                            return;
                        }
                    }
                }
                else if(key === 'ArrowRight'){         
                    switch(activeFilter){
                        case FilterTypes.ALL:{
                            changeFilter(FilterTypes.PENDING);
                            return;
                        }
                        case FilterTypes.PENDING:{
                            changeFilter(FilterTypes.COMPLETED);
                            return;
                        }
                        case FilterTypes.COMPLETED:{
                            return;
                        }
                    }
                }

        }
        document.addEventListener('keydown', setupKeyBoardEvent)
        return (()=>{
            document.removeEventListener('keydown',setupKeyBoardEvent)
        })
    },[activeFilter, changeFilter])
    const activeFilterStyle = 'text-blue-500 font-bold border-b-green-500 border-b-2';
    const inActiveFilterStyle = 'text-gray-500 font-semibold';

    return (
        <div className='flex flex-row px-2 py-1'>
            <span onClick={()=>changeFilter(FilterTypes.ALL)} className={'mx-2 ' + (activeFilter === FilterTypes.ALL? activeFilterStyle:inActiveFilterStyle) }>All</span>
            <span onClick={()=>changeFilter(FilterTypes.PENDING)}  className={'mx-2 ' + (activeFilter === FilterTypes.PENDING? activeFilterStyle:inActiveFilterStyle) }>Pending</span>
            <span onClick={()=>changeFilter(FilterTypes.COMPLETED)}  className={'mx-2 ' + (activeFilter === FilterTypes.COMPLETED? activeFilterStyle:inActiveFilterStyle) }>Completed</span>
        </div>
    )
}

function mapStateToProps(state:StateType){
    const {todoItems,activeFilter} = state
    return {items:filterItems(todoItems,activeFilter)};
}

export default connect(mapStateToProps)(TodoList)