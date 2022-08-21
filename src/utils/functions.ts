import { Todo, FilterTypes } from '../data/types';

const colors = [
    'border-l-red-300',
    'border-l-blue-300',
    'border-l-green-300',
    'border-l-yellow-300',
    'border-l-orange-300',
    'border-l-indigo-300',
]


export function generateId(collection:Todo[]):number{
    if(collection.length === 0)
        return 1;
    let ids = collection.map(function(element){
        return element.id
    });
    let max = Math.max(...ids)
    return max+1;
}

export function getRandomColor(){
    return colors[Math.floor(Math.random() * colors.length)]
}

export function createItem(items:Todo[],title:string):Todo {
    let item:Todo = {
        id: generateId(items),
        title:title,
        completed:false,
        color:getRandomColor()
    }
    return item;
}

export function removeItem(items:Todo[],id:number):Todo[]{
    let output = items.filter((item, index)=>{
        return item.id !== id
    });
    return  output;
}

export function toggleItem(items:Todo[], id:number):Todo[]{
    let item = items.filter((element, index)=>{
        return element.id === id;
    })[0];
    let index = items.indexOf(item);
    item.completed = !item.completed;
    items[index] = item;
    return items;
}

export function filterItems(items:Todo[], filter:FilterTypes):Todo[]{
    let output:Todo[] = []
    switch(filter){
        case FilterTypes.ALL:{
            output = [...items];
            break;
        }
        case FilterTypes.COMPLETED:{
            output = [...items.filter((item,index)=>{
                return item.completed;
            })]
            break;
        }
        case FilterTypes.PENDING:{
            output = [...items.filter((item,index)=>{
                return !item.completed;
            })]
            break;
        }
        default:
            output = items;
            break;
    }
    return output;
}

export function deleteAll(items:Todo[],filter:FilterTypes):Todo[]{
    switch(filter){
        case FilterTypes.ALL:{
          return [];
        }
        case FilterTypes.PENDING:{
          let temp = items.filter((element,index)=>{
            return element.completed;
          })
          return temp;
        }
        case FilterTypes.COMPLETED:{
          let temp = items.filter((element,index)=>{
            return !element.completed;
          })
          return temp;
        }
        default:
            return items;
      } 
}