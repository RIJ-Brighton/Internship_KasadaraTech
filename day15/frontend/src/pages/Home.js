import { useEffect , useState } from 'react';
import axios from 'axios';

import Task from '../components/Task';
import PostUI from '../components/PostUI';
//includes

export default function Home() {

  const [ tasks , setTasks ] = useState([])
  const [ getAllError , setGetAllError ] = useState('')

  useEffect(() => {
    axios.get('http://localhost:4000/api/tasks/').then((res) => {
      if(res.status === 200){
        setGetAllError('')
        setTasks(res.data)
      }else if(res.status === 500){
        setGetAllError('Error')
      }
    }).catch((e) => {
      setGetAllError(e)
    })
  } , [])

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
