import React from 'react';
import DeleteAllButton from './component/DeleteAllButton';
import TodoInput from './component/TodoInput';
import TodoList from './component/TodoList';


const App = () => {
  return (
    <div className="flex flex-col pt-20 items-center w-screen h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="flex p-2 flex-col max-w-2xl w-3/4 h-4/5 bg-white rounded-lg shadow-lg">
        <div className='flex flex-row px-4 py-2'>
          <span className='text-blue-500 font-bold text-2xl'>Todo List</span>
        </div>
        <TodoInput/>
        <TodoList/>
        <DeleteAllButton/>
      </div>
    </div>
  );
}

export default App;
