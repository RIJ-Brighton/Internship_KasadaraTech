import './Profile.css';
import { useUserAuth } from '../context/UserAuthContext';

import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft , faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

import { ToastContainer , toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Profile(){

    const { logOut, currentUsername , isUsernameExists } = useUserAuth();
    
    const profile = currentUsername?.charAt(0).toUpperCase();
    const src = localStorage.getItem('profile');

    const [ newUsername , setNewUsername ] = useState('');
    
    const navigate = useNavigate();
    
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
        //post to firebase
    }

    return (
       <>
       <div className="home">
        <div className="top-left">
          <h2 className='Quoteogram' >Hello, {currentUsername}</h2>
        </div>
        <div className="top-right">
          {!src ? <div className="profile">{profile}</div> : <img src={src} className='profile' alt='profile' /> }
          <FontAwesomeIcon className='back' icon={faArrowLeft} onClick={() => {
            navigate('/home');
          }}/>
          <FontAwesomeIcon className='sign-out' icon={faSignOutAlt} onClick={() => {
            logOut();
            localStorage.clear();
          }}/>
        </div>
      </div>
      <ToastContainer/>
      <div className='create-post' >
          <h3>Change Username</h3>
          <form className='ip-form' onSubmit={changeUsername}>
            <div className='input-div'>
              <input type="text" placeholder='New Username' className='title-area' onChange={e => setNewUsername(e.target.value)} /><br/>
            </div>
            <br/>
            <button className='submit-btn' type="submit">Change</button>  
          </form>
        </div>
       </>
    );
}