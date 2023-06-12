import './App.css';
import Home from './Home';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function App() {
  
  const [userName , setUserName] = useState('');
  const [signedUp , setSignedUp] = useState('');
  const [loggedIn , setLoggedIn] = useState(false);
  const container = useRef();
  const { register : signUpRegister , handleSubmit : signUpHandleSubmit } = useForm();
  const { register : loginRegister, handleSubmit : loginHandleSubmit } = useForm();

  const signUpClick = (data) => {
    console.log('Sign Up '+data.username,data.password,data.email);
    const creds = {
      username: data.username,
      email: data.email,
      password: data.password
    };

    localStorage.setItem('creds_'+data.username, JSON.stringify(creds));
    setSignedUp('Account Created! Login?');
    setTimeout(() => {
      container.current.classList.remove("right-panel-active");
    }, 2000);
  }

  const logInClick = (data) => {
    console.log('Log In '+data.username,data.password);
    const storage = localStorage.getItem('creds_'+data.username);
    if (storage) {
      const creds = JSON.parse(storage);
      console.log(creds);
      if (creds.password === data.password) {
        console.log("loggedin");
        setLoggedIn(true);
        setUserName(data.username);
      }
      else{
        console.log('Invalid Passowrd');
      }
    }
    else{
      console.log('Account Not Found');
    }
  }

  return (
    <>{ loggedIn ? <Home username={userName} setLoggedIn={setLoggedIn}/> :
        <div className="container" id="container" ref={container}>
          <div className="form-container sign-up-container">
            
            <form action="#" onSubmit={signUpHandleSubmit(signUpClick)}>
              <h1>Create Account</h1><br/>
              <input type="text" placeholder="Username" {...signUpRegister('username')} required/>
              <input type="email" placeholder="Email" {...signUpRegister('email')} required/>
              <input type="password" placeholder="Password" {...signUpRegister('password')} required/>
              <span>{signedUp}</span>
              <button>Sign Up</button>
            </form>
          
          </div>
          <div className="form-container sign-in-container">
          
            <form action="#" onSubmit={loginHandleSubmit(logInClick)} >
              <h1>Log in</h1><br/>
              <input type="text" placeholder="Username" {...loginRegister('username')} required/>
              <input type="password" placeholder="Password" {...loginRegister('password')} required/>
              <button>Log In</button>
            </form>

          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>Already have an Account?</p>
                <button className="ghost" id="signIn" onClick={() => {
                  container.current.classList.remove("right-panel-active");}
                } >Log In</button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Welcome!</h1>
                <p>Don't have an Account?</p>
                <button className="ghost" id="signUp" onClick={() => {
                  container.current.classList.add("right-panel-active");}
                }>Sign Up</button>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
}
// Florin Pop https://codepen.io/FlorinPop17/pen/vPKWjd