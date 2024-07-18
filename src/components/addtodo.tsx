import React, { FormEvent, useState } from 'react'
import { useTodos } from '../store/todo'

const AddToDo = () => {
    const [todo, setTodo] = useState("")
    const {handleAddTodo} = useTodos();

    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleAddTodo(todo)
        setTodo("")
    }
  return (
    <form onSubmit={handleSubmit} >
        <input type="text" name=""  value={todo} onChange={(e) => setTodo(e.target.value)
       } required/>
       <button type='submit'>Add</button>
    </form>
  )
}

export default AddToDo