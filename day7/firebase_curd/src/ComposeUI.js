import './ComposeUI.css';
import { addDoc , collection } from 'firebase/firestore';
import { db } from './firebase';
import { useState } from 'react'; 

export default function ComposeUI ({ setShowPostMenu , username }){ 

    const postReference = collection(db , 'posts');

    const [ title , setTitle ] = useState('');
    const [ message , setMessage ] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const post = {
        title:title,
        message:message,
        username:username
      };
      console.log(post);
      // insert into table
    }

    return(
        <div className='create-post' >
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