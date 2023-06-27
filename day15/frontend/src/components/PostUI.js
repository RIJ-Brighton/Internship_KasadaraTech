import { useState } from "react"
import axios from 'axios'

export default function PostUI() {
  
    const [ title , setTitle ] = useState('')
    const [ postError , setPostError ] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!title){
            setPostError('Enter some Title')
            return;
        }
        axios.post('http://localhost:4000/api/tasks/',{taskTitle:title})
        .then((res) => {
            if(res.status === 201){
                setPostError('')
                setTitle('')
                console.log('res code',res.status,'Posted')
            }else if(res.status === 400){
                setPostError('Error',res)
            }
        }).catch((e) => {
            setPostError(e)
        })
    }

    return (
    <form className="create" onSubmit={handleSubmit}>
        <h3>Add New Task</h3>
        <label>Task : </label>
        <input type="text" onChange={e => setTitle(e.target.value)} value={title} />
        <button>Post Task</button>
        {postError && <div className="error">{postError}</div>}
    </form>
  )
}
