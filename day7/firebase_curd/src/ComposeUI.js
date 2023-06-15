import './ComposeUI.css';
import { addDoc , collection } from 'firebase/firestore';
import { db , auth } from './firebase';
import { useState } from 'react'; 
import { toast , ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ComposeUI ({ setShowPostMenu , gmail }){ 

    const postReference = collection(db , 'posts');

    const [ title , setTitle ] = useState('');
    const [ message , setMessage ] = useState('');
  
    const postUserPost = (post) => {
        addDoc(postReference, post);
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      if(title.length >= 1 && message.length >= 1){
        const post = {
            Title:title,
            Message:message,
            Gmail:gmail,
            id:auth?.currentUser.uid
        };
        console.log(post);
        toast.success('Posted!', {position: toast.POSITION.TOP_LEFT});
      }else{
        toast.warn('Enter Some Valid Title and Message', {position: toast.POSITION.TOP_LEFT});
      }
      // insert into table
    }

    return(
        <div className='create-post' >
          <ToastContainer />
          <h3>Create Post</h3>
          <button className='clear-btn' onClick={() => {
              setMessage('');
              setTitle('');
              setShowPostMenu(false);
            }} >Cancel</button>
          <form onSubmit={handleSubmit}>
            <div className='input-div'>
              <input type="text" placeholder='Title' className='title-area' onChange={e => setTitle(e.target.value)} /><br/>
              <textarea type="text" placeholder='  Message' className='message-area' rows={3} onChange={e => setMessage(e.target.value)} />
            </div>
            <br/>
            <button type="submit">Submit</button>
            
          </form>
        </div>
    );
}