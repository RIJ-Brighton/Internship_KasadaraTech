import './Home.css';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';

export default function Home({ gmail }) {

  return (
      <div className="home">
        <h1>Hello , {gmail}</h1>
        <button className='form-button' onClick={() => {
            signOut(auth);
        }}>Log Out</button>
      </div>
  );
}
//logout