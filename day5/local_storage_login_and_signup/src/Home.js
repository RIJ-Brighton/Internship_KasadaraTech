import './Home.css';

export default function Home({username, setLoggedIn}) {

  return (
      <div className="home">
        <h1>Hello , {username}</h1>
        <button className='form-button' onClick={() => {
            setLoggedIn(false);
        }}>Log Out</button>
      </div>
  );
}
//logout