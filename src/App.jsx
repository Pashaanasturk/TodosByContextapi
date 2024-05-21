import { useEffect, useState } from 'react'
import { TodoProvider } from './contexts'
import TodoForm from './components/TodoForm';
import { TodoItem } from './components';

function App() {

  //our state todos variable have all the todos
  const [todos, setTodos] = useState([]);

  // This todo argument is coming from our form and this is just functionality define to add Todo
  const addTodo= (todo)=> {
    setTodos((oldTodos)=> [{id: Date.now(), ...todo}, ...oldTodos])
  }

  const updatedTodo= (id, todo)=> {
    setTodos((oldTodos)=>
    oldTodos.map((eachTodo)=> (eachTodo.id===id ? todo : eachTodo)))

    // //simplified above logic
    // // prevValues.map((eachValue)=> {
    // //   if(eachValue.id===id)
    // //   {
    // //     todo
    // //   }
    // //   else{
    // //     prevTodo
    // //   }
    // })
  }

  const deleteTodo= (id)=> {
    setTodos((oldTodos)=>
     oldTodos.filter((prevTodo)=> prevTodo.id !== id))
  }

  const toggleComplete= (id)=> {
    setTodos((oldTodos)=>
     oldTodos.map((prevTodo)=>
      prevTodo.id === id ? {...prevTodo, completed: !prevTodo.completed} : prevTodo))
  }

  useEffect(() => {
    const ourTodos= JSON.parse(localStorage.getItem("todos"))

    if(ourTodos && ourTodos.length > 0)
    {
      setTodos(ourTodos)
    }
  }, [])

  useEffect(()=> {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])
  

  return (
    <TodoProvider value={{todos, addTodo, updatedTodo,deleteTodo, toggleComplete}}>
      <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */}
                        <TodoForm/> 
                        
                    </div>
                    <div className="flex flex-wrap gap-y-3">

                      {/*Loop and Add TodoItem here */}
                      {todos.map((todo) => (
                          <div key={todo.id}
                          className='w-full'
                          >
                            <TodoItem todo={todo} />
                          </div>
                        ))}
                        
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}

export default App
