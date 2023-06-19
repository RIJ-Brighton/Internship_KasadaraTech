import './ComposeUI.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { addDoc , collection } from 'firebase/firestore';
import { db } from '../firebase';
import { useUserAuth } from '../context/UserAuthContext';
import { useState } from 'react'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ComposeUI ({ setShowPostMenu }){ 

    const { user } = useUserAuth();  
    const postReference = collection(db , 'posts');

    const [ title , setTitle ] = useState('');
    const [ message , setMessage ] = useState('');
    const [ imgSrc , setImgSrc ] = useState('base64 encoded image placeholder');

    const postUserPost = (post) => {
        addDoc(postReference, post);
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      if(title.length > 30) {
        toast.warn('Title cant be longer than 30 characters', {position: toast.POSITION.TOP_LEFT});
        return;
      }
      if(message.length > 1300) {
        toast.warn('Quote cant be longer than 1300 characters', {position: toast.POSITION.TOP_LEFT});
        return;
      }
      if(title.length >= 1 && message.length >= 1 && imgSrc.length > 1){
        const post = {
            Title:title,
            Quote:message,
            Image:imgSrc,
            Gmail:user.email,
            UID:user.uid
        };
        postUserPost(post);
        console.log(post);
        setShowPostMenu(false);
        toast.success('Posted!', {position: toast.POSITION.TOP_LEFT});
      }else{
        toast.warn('Enter Some Valid Title and Message', {position: toast.POSITION.TOP_LEFT});
      }
    }

    return(
        <div className='create-post' >
          <h3>Create Post</h3>
          <FontAwesomeIcon icon={faTimes} className='clear-btn' onClick={() => {
              setMessage('');
              setTitle('');
              setShowPostMenu(false);
            }}/>

          <form className='ip-form' onSubmit={handleSubmit}>
            <div className='input-div'>
              <input type="text" placeholder='Title' className='title-area' onChange={e => setTitle(e.target.value)} /><br/>
              <textarea type="text" placeholder='  Message' className='message-area' rows={3} onChange={e => setMessage(e.target.value)} />
            </div>
            <br/>
            <button className='submit-btn' type="submit">Submit</button>  
          </form>

        </div>
    );
}