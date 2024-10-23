import { useEffect, useState } from "react"
import { TodoProvider } from "./Context";
import { TodoForm, TodoItem } from "./assets/Components";


function App() {
  const [todos, setTodos] = useState([]);
  const addTodo = (todo) =>{
    setTodos((prev) => [{id: Date.now(),...todo},...prev])
  }
  const updateTodo = (id,todo) => {
    setTodos((prev)=> prev.map((prevTodo)=>(prevTodo.id ===id ? todo: prevTodo)))
  }
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo)=> todo.id !==id))
  }
  const toggleComplete = (id) => {
    // Map over the todos to find and toggle the 'completed' status
    setTodos((prev) =>
      prev.map((prevTodo) => 
        prevTodo.id === id 
          ? { ...prevTodo, completed: !prevTodo.completed } // Toggle the completed status
          : prevTodo // Return the original todo if the id doesn't match
      )
    );
  };
  

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      try {
        const parsedTodos = JSON.parse(storedTodos); // Parse stored JSON string
        if (parsedTodos.length > 0) {
          setTodos(parsedTodos); // Set the state if parsed todos are valid
        }
      } catch (error) {
        console.error("Failed to parse todos from localStorage:", error); // Handle parsing errors
      }
    }
  }, []);


  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])


  return (
    <TodoProvider value={{todos,addTodo,updateTodo,deleteTodo,toggleComplete}}>
      <div className="bg-[#172842] min-h-screen py-8">
                  <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                      <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                      <div className="mb-4">
                          {/* Todo form goes here */} 
                          <TodoForm />
                      </div>
                      <div className="flex flex-wrap gap-y-3">
                          {/*Loop and Add TodoItem here */}
                          {todos.map((todo)=>(
                            <div key={todo.id}
                            className="w-full"
                            >
                              <TodoItem todo={todo}/>
                            </div>
                          ))}
                      </div>
                  </div>
        </div>
    </TodoProvider>
  )
}

export default App;
