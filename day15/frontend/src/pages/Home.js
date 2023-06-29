import { useEffect , useState } from 'react';
import axios from 'axios';

import Task from '../components/Task';
import PostUI from '../components/PostUI';
import { useTaskContext } from '../context/TaskContext';
import { Box, Container, Stack, Typography } from '@mui/material';
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
    <Container maxWidth='xl'>
      <Stack direction='row' spacing={2} justifyContent='space-between' >
        
        <Box flex={2} borderRadius={10} border={'solid'} padding={2}>
          <Typography variant='h5' padding={2}>Assigned</Typography>
          <Stack direction='column' spacing={2}>
          {tasks && tasks.map(task => <Task key={task._id} task={task} /> )}
          </Stack>
          {getAllError && getAllError}
        </Box>

        <Box flex={2} borderRadius={10} border={'solid'} padding={2}>
          <Typography variant='h5' padding={2}>Completed</Typography>
          <Stack direction='column' spacing={2}>
          </Stack>
        </Box>
        
        <PostUI/>
      </Stack>
    </Container>
  )
}
