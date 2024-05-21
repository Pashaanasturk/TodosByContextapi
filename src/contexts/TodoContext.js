import { createContext, useContext } from "react";

export const TodoContext= createContext({
    todos: [
        {
            id: 1,
            todoMsg: "Learn DSA",
            completed: false
        }
    ],
     addTodo: (todoTitle)=> {},
     updatedTodo: (id, todoTitle)=> {},
     deleteTodo: (id)=> {},
     toggleComplete: (id)=> {}
})



export const TodoProvider= TodoContext.Provider;

export const useTodo= ()=> {
    return useContext(TodoContext);
}