import './Home.css';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import { useState } from 'react';
import Card from './Card';
import ReadOnlyCard from './ReadOnlyCard';
import ComposeUI from './ComposeUI';

export default function Home({ gmail }) {

  const username = gmail.split('@')[0];
  const profile = username.charAt(0).toUpperCase();
  const src = localStorage.getItem('profile');

  const [ showPostMenu , setShowPostMenu ] = useState(false);

  //do something about reading posts -> adding in array(state) -> disp in UI using map read

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
      {showPostMenu ? <ComposeUI setShowPostMenu={setShowPostMenu}  gmail={gmail} /> : <></>
        }
      <div className='Posts'> 
        {/* show card_with_update_and_del buttons only if gmail in post matches auth.gmail 
        else show card_without_buttons  */}
        <Card gmail={gmail} title={'Test Title 0'} message={'Test Message'} />
        <ReadOnlyCard gmail={gmail} title={'Test Title 1'} message={'Test Message'} />
        <ReadOnlyCard gmail={gmail} title={'Test Title 2'} message={'Test Message'} />
        <ReadOnlyCard gmail={gmail} title={'Test Title3 '} message={'Test Message'} />
      </div>
    </>
  );
}
//logout