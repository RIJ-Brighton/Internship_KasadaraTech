import axios from 'axios';
import { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { Box, Button, Card, CardContent, Typography, CardMedia } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import  Send from '@mui/icons-material/Send';
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
    <Card className='task-card' draggable>

    <Box>
      <Box sx={{ display: 'flex',justifyContent:'space-between' }}>
        <CardContent>
          <Typography component="div" variant="h5" sx={{maxWidth:'20vw',overflowX:'auto'}}> {task.taskTitle} </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div"> <strong>Priority : </strong> {task.taskPriority} </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div"> {formatDistanceToNow(new Date(task.createdAt) , {addSuffix:true})} </Typography>
        </CardContent>

        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={task.taskImg}
          alt="Task Image"
          flex={1}
        />
      </Box>
      <Box sx={{
            display: 'flex', 
            justifyContent:'space-between'
          }} m={1} flex={2}>
          <Button variant='contained' endIcon={<DeleteIcon/>} onClick={handleClick}>Delete</Button>
          <Button variant='contained' endIcon={<Send/>}>Assign</Button>
      </Box>
      {delError && delError}
    </Box>

  </Card>
  )
}
