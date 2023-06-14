import './Home.css';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';

export default function Home({ gmail }) {

  const username = gmail.split('@')[0];
  const profile = username.charAt(0).toUpperCase();
  
  return (
    <div className="home">
      <div className="top-left"><h2>Hello, {username}</h2></div>
      <div className="top-right">
      <div className="profile">{profile}</div>
        <button className="form-button" onClick={() => signOut(auth)}>
          Log Out
        </button>
      </div>
    </div>
  );
}
//logout