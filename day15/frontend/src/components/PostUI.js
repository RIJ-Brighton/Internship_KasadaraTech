import { useState } from "react"
import axios from 'axios'
import { useTaskContext } from '../context/TaskContext';
import { Box, Button, Drawer, FormControlLabel, FormGroup, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import FileUploadIcon from '@mui/icons-material/FileUpload';

export default function PostUI() {
  
    const [ title , setTitle ] = useState('') //max len 30chars
    const [priority, setPriority] = useState('');
    const [ img , setImg ] = useState(null)
    const [ postError , setPostError ] = useState('')
    const { dispatch } = useTaskContext();

    const handleSubmit = (e) => {
        e.preventDefault();
        //error handling
        if(!title){ setPostError('Enter some Title'); return;}
        if(title.length > 50){ setPostError('Title too long'); return;}
        if(!priority){ setPostError('Choose a Priority'); return;}
        if(!img){ setPostError('Choose an Image'); return;}
        if(!(img.type.startsWith('image/'))){ setPostError('Image must be a png or jpeg'); return;}

        const data = {
            taskTitle:title,
            taskPriority:priority,
            taskImg:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII'
        }
        axios.post('http://localhost:4000/api/tasks/',data)
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

    //Image
    const setImage = (e) => {
        setImg(e.target.files[0])
    }

    //priority
    const handleChange = (e) => {
      setPriority(e.target.value);
    };

    //sidebar
    const [sideBar, setSideBar] = useState(false);

    return (
        <div>
            <Button onClick={() => setSideBar(true)}>Add Task</Button>
            <Drawer open={sideBar} onClose={() => setSideBar(false)}>
                <Box>
                <FormGroup flex={1} >
                    <Typography variant="h5" padding={2}>Add Task</Typography>
                    <TextField id="outlined-multiline-flexible" label="Task" multiline maxRows={4}
                        value={title} required={true} onChange={e => setTitle(e.target.value)} error={postError ? true : false}
                    />
                    {postError && <Typography color={'error'} padding={2}>{postError}</Typography>}

                    <RadioGroup value={priority} onChange={handleChange}>
                        <FormControlLabel
                        control={<Radio />}
                        label="High Priority"
                        value="high"
                        />
                        <FormControlLabel
                        control={<Radio />}
                        label="Medium Priority"
                        value="medium"
                        />
                        <FormControlLabel
                        control={<Radio />}
                        label="Low Priority"
                        value="low"
                        />
                    </RadioGroup>

                    <Button variant="contained" component="label" endIcon={<FileUploadIcon/>}>Image
                    <input type="file" hidden onChange={setImage} />
                    </Button><br/>
                    <Button variant='contained' onClick={handleSubmit} >Add</Button>
                </FormGroup>
                </Box>
            </Drawer>
      </div>
  )
}