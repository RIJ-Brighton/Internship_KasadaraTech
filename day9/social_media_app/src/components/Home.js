import { db } from '../firebase';
import { onSnapshot , collection } from 'firebase/firestore';
import { useUserAuth } from '../context/UserAuthContext';

import { useEffect, useState } from 'react';

import { ToastContainer } from 'react-toastify';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus , faSignOutAlt , faUser } from '@fortawesome/free-solid-svg-icons';

import { useNavigate } from 'react-router-dom';

import './Home.css';
import Card from './Card';
import ReadOnlyCard from './ReadOnlyCard';
import ComposeUI from './ComposeUI';

export default function Home() {


  const { logOut , user , currentUsername } = useUserAuth();
  const navigate = useNavigate();

  const gmail = user.email;

  const username = currentUsername;
  const profile = username?.charAt(0).toUpperCase();
  const src = localStorage.getItem('profile');

  const [ showPostMenu , setShowPostMenu ] = useState(false);

  const [ posts , setPosts ] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db , 'posts'), (snapshot) => {
      const posts = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setPosts(posts);
      console.log("New posts:","number of posts "+(posts.length), posts);
    }, (error) => {
      console.log('Post fetch error:', error);
    });
  
    return () => unsubscribe();
  }, []);
  
  return (
    <>
      {showPostMenu && <ComposeUI setShowPostMenu={setShowPostMenu}  gmail={gmail} />}
      <div className="home">
        <div className="top-left">
          <h2 className='user-name' >Hello, {username}</h2>
        </div>
        <div className="top-right">
          {!src ? <div className="profile">{profile}</div> : <img src={src} className='profile' alt='profile' /> }
          <FontAwesomeIcon className='user-profile' icon={faUser} onClick={ () => {
              navigate('/profile');
            }
          }/>
          <FontAwesomeIcon className='add-post' icon={faPlus} id='postCreation' onClick={() => {
            setShowPostMenu(true);
          }} />
          <FontAwesomeIcon className='sign-out' icon={faSignOutAlt} onClick={() => {
            logOut();
            localStorage.clear();
          }}/>
        </div>
      </div>
      <ToastContainer/>
      <div className='Posts'>
        { posts.map(post => post.UID === user.uid ? 
        <Card key={post.id} gmail={post.Gmail} title={post.Title} Quote={post.Quote} id={post.id} /> : 
        <ReadOnlyCard key={post.id} gmail={post.Gmail} title={post.Title} Quote={post.Quote} /> )}
      </div>
      </>
  );
}