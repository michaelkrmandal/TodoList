import React, { useEffect, useState } from "react"
import Create from './Create'
import axios from 'axios'
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs';

function Home() {
  const [todos, setTodos] = useState([])
  useEffect(() => {
    axios.get('http://localhost:8080/get')
    .then(result => setTodos(result.data))
    .catch(err => console.log(err))
  },[])

  const handleEdit = (id) => {
    axios.put('http://localhost:8080/update/'+id)
    .then(result => {
      location.reload(result)
    })
    .catch(err => console.log(err))
  }

  const handleDelete = (id) => {
    axios.delete('http://localhost:8080/delete/'+id)
    .then(result => {
      location.reload(result)
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="home">
       <h2>Todo List</h2>
       <h2></h2>
       <Create />
       {
        todos.length === 0 ?
        <div><h2>No Record</h2></div>
        :
        todos.map((todo) => (
          <div key={todo._id} className="task">
            <div className="checkbox" onClick={() => handleEdit(todo._id)}>
              {todo.done ? 
                <BsFillCheckCircleFill className="icon"></BsFillCheckCircleFill>
                : <BsCircleFill className="icon"/>
              }
              <p className={todo.done ? "line_through" : ""}>{todo.task}</p> 
            </div>
            <div>
               <span onClick={() => handleDelete(todo._id)}><BsFillTrashFill className="icon"/></span>
            </div>
          </div>
        ))
       }
    </div>
  )
}

export default Home;