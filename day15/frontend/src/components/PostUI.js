import { useState } from "react"
import axios from 'axios'
import { useTaskContext } from '../context/TaskContext';
import { Box, Button, TextField, Typography } from "@mui/material";
import FileUploadIcon from '@mui/icons-material/FileUpload';

export default function PostUI() {
  
    const [ title , setTitle ] = useState('') //max len 30chars
    const [ img , setImg ] = useState(null)
    const [ postError , setPostError ] = useState('')
    const { dispatch } = useTaskContext();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!title){
            setPostError('Enter some Title')
            return;
        }
        if(title.length > 50){
            setPostError('Title too long')
            return;
        }
        if(!img){
            setPostError('Choose an Image')
            return;
        }
        if(!(img.type.startsWith('image/'))){
            setPostError('Image must be a png or jpeg')
            return;
        }
        axios.post('http://localhost:4000/api/tasks/',{taskTitle:title})
        .then((res) => {
            if(res.status === 201){
                setPostError('')
                setTitle('')
                console.log('res code',res.status,'Posted')
                dispatch({type:'Post', payload:res.data})
            }else if(res.status === 400){
                setPostError('Error',res)
            }
        }).catch((e) => {
            setPostError(e)
        })
    }

    return (
        <Box flex={1} display={'flex'} flexDirection={'column'} padding={2}>
            <Typography variant="h5" padding={2}>Add Task</Typography>
            <TextField label="Task" value={title} required={true} onChange={e => setTitle(e.target.value)} error={postError ? true : false} />
            {postError && <Typography color={'error'} padding={2}>{postError}</Typography>}
            <Button variant="contained" component="label" endIcon={<FileUploadIcon/>}>Image
            <input type="file" hidden onChange={e => {setImg(e.target.files[0])}} />
            </Button>
            <Button variant='contained' onClick={handleSubmit} >Add</Button>
        </Box>
  )
}
