import React,{useEffect} from "react";
import { Todo, FilterTypes } from '../data/types';
import { getRandomColor } from "../utils/functions";
import DeleteIcon from './DeleteIcon';
import StatusIcon from "./StatusIcon";

interface ListProps {
    items: Todo[],
    filter:FilterTypes,
    onDelete: (id:number)=>void,
    onToggle: (id:number)=>void,
    onFilterChange: (filter: FilterTypes)=>void
}

interface ItemProps {
    item: Todo,
    deleteItem: (id:number)=>void,
    toggleItem: (id:number)=>void
}

const TodoList = ({items, onDelete, onToggle, onFilterChange, filter}:ListProps)=>{
    const onFilterClick = (filter:FilterTypes)=>{
        console.log(`filterChange: ${filter}`)
        onFilterChange(filter);
    }
    return (
        <div className="flex flex-col h-full overflow-hidden">
            <FilterRow activeFilter={filter} click={onFilterClick} />
            <div className='flex flex-col px-2 py-1 overflow-y-auto'>
                {items.map((item, index)=>{
                    return <Item deleteItem={onDelete} toggleItem={onToggle} item={item} key={(index + item.id).toString()} />
                })}

            </div>
        </div>
    )
}
export default TodoList;


const Item = ({item, deleteItem, toggleItem}: ItemProps)=>{
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
                    <StatusIcon id={item.id} completed={item.completed} toggle={toggleItem} />
                    <DeleteIcon click={deleteItem} id={item.id} />
                </div>
            </div>
        </div>
    )
}

interface FilterRowProps {
    activeFilter:FilterTypes,
    click:(filter:FilterTypes)=>void
}
const FilterRow = ({click, activeFilter}:FilterRowProps)=>{
    
    useEffect(()=>{
        const setupKeyBoardEvent = (event:KeyboardEvent)=>{  
            let key = event.key  
                if(key == 'ArrowLeft'){
                    switch(activeFilter){
                        case FilterTypes.ALL:{                                             
                            return;
                        }
                        case FilterTypes.PENDING:{   
                            click(FilterTypes.ALL);
                            return;
                        }
                        case FilterTypes.COMPLETED:{
                            click(FilterTypes.PENDING);
                            return;
                        }
                    }
                }
                else if(key == 'ArrowRight'){         
                    switch(activeFilter){
                        case FilterTypes.ALL:{
                            click(FilterTypes.PENDING);
                            return;
                        }
                        case FilterTypes.PENDING:{
                            console.log('pending called');
                            click(FilterTypes.COMPLETED);
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
            console.log('removed')
            document.removeEventListener('keydown',setupKeyBoardEvent)
        })
    },[activeFilter])
    const activeFilterStyle = 'text-blue-500 font-bold border-b-green-500 border-b-2';
    const inActiveFilterStyle = 'text-gray-500 font-semibold';

    return (
        <div className='flex flex-row px-2 py-1'>
            <span onClick={()=>click(FilterTypes.ALL)} className={'mx-2 ' + (activeFilter == FilterTypes.ALL? activeFilterStyle:inActiveFilterStyle) }>All</span>
            <span onClick={()=>click(FilterTypes.PENDING)}  className={'mx-2 ' + (activeFilter == FilterTypes.PENDING? activeFilterStyle:inActiveFilterStyle) }>Pending</span>
            <span onClick={()=>click(FilterTypes.COMPLETED)}  className={'mx-2 ' + (activeFilter == FilterTypes.COMPLETED? activeFilterStyle:inActiveFilterStyle) }>Completed</span>
        </div>
    )
}