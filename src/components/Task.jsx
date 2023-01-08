
const Task = ({ value, handleDelete, Id, handleEdit }) => {
  return (
    <div className='task-item'>
        <span>{value}</span>
        <span>
            <i className="fa-regular fa-pen-to-square task-icon" title="edit" onClick={() => handleEdit(Id)}></i>
            <i className="fa-solid fa-trash-can task-icon" title="delete" onClick={() => handleDelete(Id)}></i>
        </span>
    </div>
  )
}

export default Task