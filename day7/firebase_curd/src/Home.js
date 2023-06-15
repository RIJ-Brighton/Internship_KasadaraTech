import './Home.css';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import { useState } from 'react';
import Card from './Card';
import ComposeUI from './ComposeUI';

export default function Home({ gmail }) {

  const username = gmail.split('@')[0];
  const profile = username.charAt(0).toUpperCase();
  const src = localStorage.getItem('profile');

  const [ showPostMenu , setShowPostMenu ] = useState(false);

  //do something about reading posts -> adding in array(state) -> disp in UI using map

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
      {showPostMenu ? <ComposeUI setShowPostMenu={setShowPostMenu}  username={username} /> : <></>
        }
    </>
  );
}
//logout