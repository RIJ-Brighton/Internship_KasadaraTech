import axios from 'axios';
import { useState } from 'react';

export default function Task({ task }) {
  
  const [ delError , setDelError ] = useState('')

  const handleClick = async (e) => {
    e.preventDefault()
    axios.delete(`http://localhost:4000/api/tasks/${task._id}`).then((res) => {
      if(res.status === 200){
        setDelError('')
      }else if(res.status === 500){
        setDelError('Error')
      }
    }).catch((e) => {
      setDelError(e)
    })

  }

  return (
    <div className="task-details">
        <h4>{task.taskTitle}</h4>
        <p><strong>Status : </strong>{task.taskStatus ? 'Completed' : 'Not Completed'}</p>
        <p>{task.createdAt}</p>
        <span onClick={handleClick} >Delete</span>
        {delError && delError}
    </div>
  )
}
