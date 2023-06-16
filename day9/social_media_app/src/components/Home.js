import { signOut } from 'firebase/auth';
import { auth , db } from '../firebase';
import { onSnapshot , collection } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import './Home.css';
import Card from './Card';
import ReadOnlyCard from './ReadOnlyCard';
import ComposeUI from './ComposeUI';

export default function Home() {

  // const gmail = read gmail from context

  const postReference = collection(db , 'posts');

  const username = gmail.split('@')[0];
  const profile = username.charAt(0).toUpperCase();
  const src = localStorage.getItem('profile');

  const [ showPostMenu , setShowPostMenu ] = useState(false);

  const [ posts , setPosts ] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(postReference, (snapshot) => {
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
        { posts.map(post => post?.UID === auth?.currentUser.uid ? 
        <Card gmail={post.Gmail} title={post.Title} message={post.Message} /> : 
        <ReadOnlyCard gmail={post.Gmail} title={post.Title} message={post.Message} /> )}
      </div>
    </>
  );
}