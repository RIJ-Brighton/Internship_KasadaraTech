import './Home.css';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import { addDoc , collection } from 'firebase/firestore';
import { db } from './firebase';
import { useState } from 'react';
import Card from './Card';

export default function Home({ gmail }) {

  const username = gmail.split('@')[0];
  const profile = username.charAt(0).toUpperCase();
  const src = localStorage.getItem('profile');

  const postReference = collection(db , 'posts');

  const [ showPostMenu , setShowPostMenu ] = useState(false);
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

  return (
    <>
      <div className="home">
        <div className="top-left">
          <h2>Hello, {username}</h2>
        </div>
        <div className="top-right">
        {!src ? <div className="profile">{profile}</div> : <img src={src} className='profile' alt='profile' /> }
          <button className="form-button" id='postCreation' onClick={() => {
            setShowPostMenu(true);
          }} >Create Post</button>
          <button className="form-button" onClick={() => {
            signOut(auth);
            localStorage.clear();
          }}>
            Log Out
          </button>
        </div>
      </div>
      <div className='Posts'> 
        <Card userName={username} title={'Test Title'} message={'Test Message'} />
      </div>
      {showPostMenu ? <div className='create-post' >
          <h3>Create Post</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <input type="text" placeholder='Title of the post' className='title-area' onChange={e => setTitle(e.target.value)} />
              <textarea type="text" placeholder='description/content of the post' className='message-area' rows={3} onChange={e => setMessage(e.target.value)} />
            </div>
            <button type="submit">Submit</button>
            <button onClick={() => {
              setMessage('');
              setTitle('');
              setShowPostMenu(false);
            }} >Cancel</button>
          </form>
        </div> : <></>
        }
    </>
  );
}
//logout