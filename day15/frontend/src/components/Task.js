import axios from 'axios';
import { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { Box, Button, Card, CardContent, Typography, CardMedia } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import  Send from '@mui/icons-material/Send';
import NorthIcon from '@mui/icons-material/North';
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
    <Card>

    <Box>
      <Box sx={{ display: 'flex',justifyContent:'space-between' }} maxWidth='sm'>
        <CardContent>
          <Typography component="div" variant="h5" > {task.taskTitle} </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div"> <strong>Priority : </strong> <NorthIcon sx={{marginTop:'5px'}}/> </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div"> {formatDistanceToNow(new Date(task.createdAt) , {addSuffix:true})} </Typography>
        </CardContent>

        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image="https://img.freepik.com/free-vector/isolated-tree-white-background_1308-24265.jpg?w=996&t=st=1687957581~exp=1687958181~hmac=718bdd5e9b4ccf0d29e6e8576f22b01586d20c8d3ceeec5da88cdc0e232cdc5a"
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
