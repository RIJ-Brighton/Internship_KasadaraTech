import { useEffect , useState } from 'react';
import axios from 'axios';

import Task from '../components/Task';
import PostUI from '../components/PostUI';
import { useTaskContext } from '../context/TaskContext';
//includes

export default function Home() {

  const { tasks , dispatch } = useTaskContext();
  const [ getAllError , setGetAllError ] = useState('')

  useEffect(() => {
    axios.get('http://localhost:4000/api/tasks/').then((res) => {
      if(res.status === 200){
        setGetAllError('')
        dispatch({ type:'Fetch' , payload:res.data})
      }else if(res.status === 500){
        setGetAllError('Error')
      }
    }).catch((e) => {
      setGetAllError(e)
    })
  } , [dispatch])

  return (
    <div className='home'>
        <div className='tasks'>
          {tasks && tasks.map(task => <Task key={task._id} task={task} /> )}
          {getAllError && getAllError}
        </div>
        <PostUI />
    </div>
  )
}
