import { createContext, ReactNode, useContext, useState } from "react";

export type childrenProps = {
    children : ReactNode
}

export type Todo = {
    id: string,
    task: string,
    completed: boolean,
    createdAt: Date
}

export type todosContext = {
    todos:Todo[];
    handleAddTodo:(task:string) => void;
    toggleTodoCompleted:(id:string) => void
    handleDeleteTodo:(id:string) => void
}

export const todosContext = createContext<todosContext | null>(null)

export const TodosProvider = ({children}: childrenProps) => {

    const [todos, setTodos] = useState<Todo[]>(() =>{

       try {
    const newTodos = localStorage.getItem("todos") || "[]";
    return JSON.parse(newTodos) as Todo[]

} catch (error) {
    return []
} 
    })

    const handleAddTodo = (task: string) => {
       setTodos((prev) => {
        const newTodos:Todo[] = [
            {
                id:Math.random().toString(),
                task:task,
                completed:false,
                createdAt:new Date()
            },
            ...prev
        ]
        localStorage.setItem("todos", JSON.stringify(newTodos))
        return newTodos
       })
    }

const toggleTodoCompleted = (id:string) => {
    setTodos((prev) => {
        let newTodos = prev.map((todo) => {
            if(todo.id === id){
                return{ ...todo, completed:!todo.completed }
            }
            return todo;
        })
        return newTodos
    })
}

const handleDeleteTodo = (id: string) => {
    if (window.confirm("Are you sure you want to delete?")) {
        setTodos((prev) => {
            let newTodos = prev.filter((filterTodo) => filterTodo.id !== id);
            localStorage.setItem("todos", JSON.stringify(newTodos));
            return newTodos;
        });
    }
}

    return <todosContext.Provider value={{todos, handleAddTodo, toggleTodoCompleted,handleDeleteTodo}} >
         {children}
    </todosContext.Provider>
}

export const useTodos = () => {
    const todosConsumer = useContext(todosContext);
    if(!todosConsumer){
        throw new Error("useTodos used outside of Provider")
    }
    return todosConsumer
}