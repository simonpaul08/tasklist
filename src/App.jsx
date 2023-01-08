import { useState, useRef } from 'react'
import './App.css'
import Task from './components/Task'

function App() {

  const [tasks, setTasks] = useState([])
  const [input, setInput] = useState('')
  const focus = useRef(null)
  const [editId, setEditId] = useState(0)
  const [edit, setEdit] = useState(false)

  const handleSubmit = (e) => {

    e.preventDefault()

    if(input.trim() !== ""){
      setTasks([...tasks, { value: input, Id: new Date().getTime().toString()}])
      setInput('')
    }
  }

  const handleEdit = (Id) => {
    setEdit(true)
    setEditId(Id)
    let elementEdit = tasks.find((task) => task.Id === Id)
    setInput(elementEdit.value)
    focus.current.focus()
  }

  const handleEditSubmit = (e) => {

    e.preventDefault()

    setTasks(tasks.map(task => {
      if(task.Id === editId){
        return {...task, value: input}
      }
      return task
    }))

    setEdit(false)
    setEditId(0)
    setInput('')
  }


  const handleDelete = (Id) => {
    if(Id === editId){
      setEdit(false)
      setEditId(0)
      setInput('')
    }
    setTasks(tasks.filter(task => task.Id !== Id))
  } 

  return (
    <div className="app">
      <div className='content'>
        <form className='form' onSubmit={edit ? handleEditSubmit : handleSubmit}>
          <input type="text" className='form-input' placeholder='Enter Task' value={input} onChange={(e) => setInput(e.target.value)} ref={focus}/>

          <button type='submit' className='submit-btn' onClick={edit ? handleEditSubmit : handleSubmit}>{edit ? <i className="fa-regular fa-pen-to-square"></i> :<i className="fa-regular fa-plus"></i>}</button>
        </form>

        <div className="tasklist">
          {tasks.map(task => {
            return <Task value={task.value} key={task.Id} Id={task.Id} handleDelete={handleDelete} handleEdit={handleEdit} />
          })}

        </div>
      </div>
    </div>
  )
}

export default App
