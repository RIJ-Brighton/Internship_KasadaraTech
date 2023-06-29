import { useState } from "react"
import axios from 'axios'
import { useTaskContext } from '../context/TaskContext';
import { Box } from "@mui/material";

export default function PostUI() {
  
    const [ title , setTitle ] = useState('') //max len 30chars
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
        <Box flex={1}>
            <form className="create" onSubmit={handleSubmit}>
                <h3>Add New Task</h3>
                <label>Task : </label>
                <input type="text" onChange={e => setTitle(e.target.value)} value={title} />
                <button>Post Task</button>
                {postError && <div className="error">{postError}</div>}
            </form>
        </Box>
  )
}
