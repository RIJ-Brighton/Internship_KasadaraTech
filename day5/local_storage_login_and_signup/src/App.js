import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye , faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Home from './Home';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function App() {
  
  const [ showPassword , setShowPassword ] = useState(false);

  const [ usernameExistsError , setUsernameExistsError ] = useState(false);
  const [ passwordLengthError , setPasswordLengthError ] = useState(false);
  const [ usernameError ,setUsernameError ] = useState(false);
  const [ passwordError, setpasswordError ] = useState(false);
  
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
    
    if(data.password.length < 8 ){
      console.log('password length error');
      setPasswordLengthError(true);
      return;
    }

    if( localStorage.getItem('creds_'+data.username) ){
      setUsernameExistsError(true);
      return;
    }

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
        setpasswordError(false);
        setUsernameError(false);
      }
      else{
        console.log('Invalid Passowrd');
        setpasswordError(true);
      }
    }
    else{
      setUsernameError(true);
      console.log('Account Not Found');
    }
  }

  const toggleEye = () => {
      setShowPassword(!showPassword);
  }

  return (
    <>{ loggedIn ? <Home username={userName} setLoggedIn={setLoggedIn}/> :
        <div className="container" id="container" ref={container}>
          <div className="form-container sign-up-container">
            <form action="#" onSubmit={signUpHandleSubmit(signUpClick)}>
              <h1>Create Account</h1><br/>
              <input type="text" placeholder="Username" {...signUpRegister('username')} style={ usernameExistsError?{borderColor:'red'}:{border:'white'} } required/>
              <input type="email" placeholder="Email" {...signUpRegister('email')} style={ {border: 'white'} } required/>
              <input type={showPassword?"text":"password"} placeholder="Password" {...signUpRegister('password')} style={ passwordLengthError?{borderColor:'red'}:{border:'white'} } required/>
              <FontAwesomeIcon className="password-toggle-signup" icon={!showPassword ? faEyeSlash : faEye} onClick={toggleEye}/>
              <div>{signedUp}</div>
              <button>Sign Up</button>
            </form>
          
          </div>
          <div className="form-container sign-in-container">
          
            <form action="#" onSubmit={loginHandleSubmit(logInClick)} >
              <h1>Log in</h1><br/>
              <input type="text" placeholder="Username" {...loginRegister('username')} style={ usernameError?{borderColor:'red'}:{border:'white'} } required/>
              <input type={showPassword?"text":"password"} placeholder="Password" {...loginRegister('password')} style={ passwordError?{borderColor:'red'}:{border:'white'} } required/>
              <FontAwesomeIcon className="password-toggle" icon={!showPassword ? faEyeSlash : faEye} onClick={toggleEye}/>
              <button>Log In</button>
            </form>

          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>Already have an Account?</p>
                <button className="ghost" id="signIn" onClick={() => {
                  setUsernameExistsError(false);
                  setPasswordLengthError(false);
                  container.current.classList.remove("right-panel-active");}
                } >Log In</button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Welcome!</h1>
                <p>Don't have an Account?</p>
                <button className="ghost" id="signUp" onClick={() => {
                  setUsernameError(false);
                  setpasswordError(false);
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