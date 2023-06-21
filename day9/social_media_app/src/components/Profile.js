import { useUserAuth } from '../context/UserAuthContext';
import { setDoc , doc } from 'firebase/firestore';
import { db } from '../firebase'; 
import { onSnapshot , collection } from 'firebase/firestore';

import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft , faSignOutAlt , faEdit , faTimes } from '@fortawesome/free-solid-svg-icons';
import { useState , useEffect } from 'react';

import { ToastContainer , toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './Profile.css';
import Card from './Card';

export default function Profile(){

    const { logOut, currentUsername , isUsernameExists , user , changeProfile , currentUserProfile } = useUserAuth();
    
    const profile = currentUsername?.charAt(0).toUpperCase();

    const [ newUsername , setNewUsername ] = useState('');
    const [ image , setImage ] = useState(null);
    const [ showChangeProfile , setShowChangeProfile ] = useState(false);
    const [ showChangeUsername , setShowChangeUsername ] = useState(false);
    const [ posts , setPosts ] = useState([]);

    const navigate = useNavigate();

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

    const changeUsername = (e) => {
        e.preventDefault();
        if(newUsername.length > 15 || newUsername.length < 8){
            toast.warn('Username must be between 8 and 15 characters', {position: toast.POSITION.TOP_LEFT});
            return;
        }
        if(isUsernameExists(newUsername)){
            toast.warn('Username already exists', {position: toast.POSITION.TOP_LEFT});
            return;
        }
        //update Users collection firebase
        const userInfo = {Username : newUsername}
        setDoc(doc(db , 'Users' , user.uid), userInfo).then((resp)=>{
            console.log('Success : username changed',resp);
            toast.success('Username Updated', {position: toast.POSITION.TOP_LEFT});
        }).catch((error)=>{
            console.log('Failure : didnt update collection',error);
            toast.error('Some Error Occured', {position: toast.POSITION.TOP_LEFT});
        })
    }

    const updateProfile = (e) => {
      e.preventDefault();
      if(image){
        //image error handling
        if(image.name.includes('.png') || image.name.includes('.jpeg') || image.name.includes('.jpg')){
          changeProfile(image);
          setImage(null);
          setShowChangeProfile(false);
        }
        else{
          toast.error('Choose png or jpeg', {position: toast.POSITION.TOP_LEFT});
        }
      }
      else
        toast.warn('Choose an Image', {position: toast.POSITION.TOP_LEFT});
    }

    return (
       <>
       {showChangeUsername && <div className='create-post' >
          <h3>Change Username</h3>
          <FontAwesomeIcon icon={faTimes} className='clear-btn' onClick={() => {
              setNewUsername('');
              setShowChangeUsername(false);
            }}/>
          <form className='ip-form' onSubmit={changeUsername}>
            <div className='input-div'>
              <input type="text" placeholder='New Username' className='title-area' onChange={e => setNewUsername(e.target.value)} /><br/>
            </div>
            <br/>
            <button className='submit-btn' type="submit">Change</button>  
          </form>
        </div>
        }
        
        {/* change profile */}

        {showChangeProfile && <div className='create-post' >
          <h3>Change Profile</h3>
          <FontAwesomeIcon icon={faTimes} className='clear-btn' onClick={() => {
              setImage(null);
              setShowChangeProfile(false);
            }}/>
          <form className='ip-form' onSubmit={updateProfile}>
            <div className='input-div'>
              <input type="file" className='title-area' onChange={e => { setImage(e.target.files[0]) }} /><br/>
            </div>
            <br/>
            <button className='submit-btn' type="submit">Change</button>  
          </form>
        </div>
        }
       <div className="home">
        <div className="top-left">
          <h2 className='Quoteogram' >Hello, {currentUsername}</h2>
        </div>
        <div className="top-right">

          {/* profile pic */}
          {!currentUserProfile ? <div className="profile" onClick={()=>setShowChangeProfile(true)}>{profile}</div> : 
          <img src={currentUserProfile} className='profile' onClick={()=>setShowChangeProfile(true)} alt='profile' /> }
          
          <FontAwesomeIcon  className='user-profile' icon={faEdit} onClick={() => {
            setShowChangeUsername(true);
          }}/>
          <FontAwesomeIcon className='add-post' icon={faArrowLeft} onClick={() => {
            navigate('/home');
          }}/>
          <FontAwesomeIcon className='sign-out' icon={faSignOutAlt} onClick={() => {
            logOut();
            localStorage.clear();
          }}/>
        </div>
        </div>
      <ToastContainer/>
      <div>
        <h2 className='your-quotes'>Your Quotes</h2>
        <div className='your-posts'>
          { posts.map(post => post.UID === user.uid ? <Card key={post.id+user.uid} title={post.Title} Quote={post.Quote} id={post.id} /> : <></> )}
        </div>
      </div>
       </>
    );
}