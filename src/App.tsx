import React, { useState, useEffect } from 'react';
import DeleteAllButton from './component/DeleteAllButton';
import TodoInput from './component/TodoInput';
import TodoList from './component/TodoList';
import { FilterTypes, Todo } from './data/types';
import { createItem, removeItem, toggleItem, filterItems, getRandomColor } from './utils/functions';

const initialState = [
  {id:1, title:"Call Mom", completed:false,color:getRandomColor()},
  {id:2, title:"Call Dad", completed:true,color:getRandomColor()},
]

const App = () => {
  const [items, setItems] = useState<Todo[]>(initialState);
  const [filter, setFilter] = useState<FilterTypes>(FilterTypes.ALL);

  const addTodo = (title:string)=>{
    let temp = [...items,createItem(items,title)]
    setItems(temp)
  }

  const removeTodo = (id:number)=>{
    let temp = removeItem(items, id);
    setItems(temp)
  }

  const toggleTodo = (id:number)=>{
    let temp = [...toggleItem(items, id)];
    setItems(temp)
  }

  const deleteAll = ()=>{
    switch(filter){
      case FilterTypes.ALL:{
        setItems([]);
        return;
      }
      case FilterTypes.PENDING:{
        let temp = items.filter((element,index)=>{
          return element.completed;
        })
        setItems(temp);
        return;
      }
      case FilterTypes.COMPLETED:{
        let temp = items.filter((element,index)=>{
          return !element.completed;
        })
        setItems(temp);
        return;
      }
    } 
  }

  const changeFilter = (newFilter:FilterTypes)=>{
    setFilter(newFilter);
  }
  return (
    <div className="flex flex-col pt-20 items-center w-screen h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="flex p-2 flex-col max-w-2xl w-3/4 h-4/5 bg-white rounded-lg shadow-lg">
        <div className='flex flex-row px-4 py-2'>
          <span className='text-blue-500 font-bold text-2xl'>Todo List</span>
        </div>
        <TodoInput onAddClick={addTodo} />
        <TodoList filter={filter} items={filterItems(items, filter)} onDelete={removeTodo} onFilterChange={changeFilter} onToggle={toggleTodo} />
        <DeleteAllButton activeFilter={filter} onClick={deleteAll} render={filterItems(items, filter).length > 0} />
      </div>
    </div>
  );
}

export default App;
