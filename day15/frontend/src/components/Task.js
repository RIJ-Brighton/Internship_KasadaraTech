import axios from 'axios';
import { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
//imports

export default function Task({ task }) {
  
  const { dispatch } = useTaskContext();
  const [ delError , setDelError ] = useState('')

  const handleClick = async (e) => {
    e.preventDefault()
    axios.delete(`http://localhost:4000/api/tasks/${task._id}`).then((res) => {
      if(res.status === 200){
        setDelError('')
        dispatch({type:'Del', payload:res.data})
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
        <p>{formatDistanceToNow(new Date(task.createdAt) , {addSuffix:true})}</p>
        <span className='material-symbols-outlined' onClick={handleClick} >delete</span>
        {delError && delError}
    </div>
  )
}
