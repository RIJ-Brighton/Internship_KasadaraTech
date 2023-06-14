import './App.css';
import { signInWithEmailAndPassword , createUserWithEmailAndPassword , onAuthStateChanged } from 'firebase/auth';
import { auth , signInWithGoogle } from './firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faEye , faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState , useEffect } from 'react';
import { toast , ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Home';

export default function App() {
  
  const [ showPassword , setShowPassword ] = useState(false);

  const [ AuthStateResponse , setAuthStateResponse ] = useState({});
  
  const container = useRef();
  
  const [ signUpEmail , setSignUpEmail ] = useState('');
  const [ signUpPassword , setSignUpPassword ] = useState('');
  const [ logInEmail , setLogInEmail ] = useState('');
  const [ logInPassword , setLogInPassword ] = useState('');
  
  useEffect(() => {
    const s = onAuthStateChanged(auth, (cur) => {
      console.log('changed');
      setAuthStateResponse(cur);
    });
  
    return () => s();
  }, []);

  const signUpClick = (e) => {
    e.preventDefault();
    console.log('SignUp'+signUpEmail, signUpPassword);

    if(!(signUpEmail.includes("@gmail.com"))){
      toast.error('Enter a valid Gmail ID', {position: toast.POSITION.TOP_RIGHT});
      return;
    }

    if(signUpPassword.length < 8 ){
      toast.error('Password must be atleast 8 Characters Long', {position: toast.POSITION.TOP_RIGHT});
      return;
    }

    createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword).then((createdCreds) => {
      console.log(createdCreds);
      toast.success('Account Created', {position: toast.POSITION.TOP_RIGHT});
    }).catch((error) => {
      if(error.code === 'auth/email-already-in-use') {
        toast.error('Email Already Exists', {position: toast.POSITION.TOP_RIGHT});
      }else{
        toast.error('Some Error Occured', {position: toast.POSITION.TOP_RIGHT});
      }
    })
  }

  const logInClick = (e) => {
    e.preventDefault();
    console.log('Log In '+logInEmail,logInPassword);
    signInWithEmailAndPassword(auth, logInEmail, logInPassword).then((creds) => {
      console.log('loggegin',creds);
    }).catch((error) => {
      if (error.code === 'auth/wrong-password') {
        toast.error('Invalid Password', {position: toast.POSITION.TOP_LEFT});
      } else if (error.code === 'auth/user-not-found') {
        toast.error("Acount Doesn't Exist, SignUp?", {position: toast.POSITION.TOP_LEFT});
      } else {
        toast.error('Some Error Occured', {position: toast.POSITION.TOP_LEFT});
      }
    })
  }

  const toggleEye = () => {
      setShowPassword(!showPassword);
  }

  return (
    <>{ AuthStateResponse?.email ? <Home gmail={AuthStateResponse.email} /> :
    <div className="Body">
        <div className="container" id="container" ref={container}>
          <div className="form-container sign-up-container">
            <form action='#' onSubmit={signUpClick}>
              <h1>Create Account</h1><br/>
              <input type="email" placeholder="Email" onChange={(e) => {
                setSignUpEmail(e.target.value);}
              } required/>
              <input type={showPassword?"text":"password"} placeholder="Password" onChange={(e) => {
                setSignUpPassword(e.target.value);}
              } required/>
              <FontAwesomeIcon className="password-toggle-signup" icon={!showPassword ? faEyeSlash : faEye} onClick={toggleEye}/>
              <button className='signup-button' >Sign Up</button>
              <ToastContainer />
            </form>
          
          </div>
          <div className="form-container sign-in-container">
          
            <form action='#' onSubmit={logInClick}>
              <h1>Log in</h1><br/>
              <input type="email" placeholder="Email" onChange={(e) => {
                setLogInEmail(e.target.value);}
              } required/>
              <input type={showPassword?"text":"password"} placeholder="Password" onChange={(e) => {
                setLogInPassword(e.target.value);}
              } required/>
              <FontAwesomeIcon className="password-toggle" icon={!showPassword ? faEyeSlash : faEye} onClick={toggleEye}/>
              <button className='login-button'>Log In</button>
              <FontAwesomeIcon className='google' icon={faGoogle} onClick={signInWithGoogle} />
              <ToastContainer />
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
      </div>
      }
    </>
  );
}
// Florin Pop https://codepen.io/FlorinPop17/pen/vPKWjd