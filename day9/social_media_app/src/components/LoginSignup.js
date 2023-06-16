import { useUserAuth } from '../context/UserAuthContext';

import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faEye , faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { useRef, useState } from 'react';
import { toast , ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './LoginSignup.css'

export default function LoginSignup() {
    
    const {logIn, signUp, signInWithGoogle} = useUserAuth();
    const navigate = useNavigate();

    const container = useRef();
    const [ showPassword , setShowPassword ] = useState(false);
    const [ signUpEmail , setSignUpEmail ] = useState('');
    const [ signUpPassword , setSignUpPassword ] = useState('');
    const [ logInEmail , setLogInEmail ] = useState('');
    const [ logInPassword , setLogInPassword ] = useState('');

    //functions

    //signup
    const signUpClick = (e) => {
        e.preventDefault();
        if(!(signUpEmail.includes("@gmail.com"))){
            toast.error('Enter a valid Gmail ID', {position: toast.POSITION.TOP_RIGHT});
            return;
        }
        if(signUpPassword.length < 8 ){
            toast.error('Password must be atleast 8 Characters Long', {position: toast.POSITION.TOP_RIGHT});
            return;
        }
        signUp(signUpEmail, signUpPassword).then((createdCreds) => {
            console.log(createdCreds);
            toast.success('Account Created, Login', {position: toast.POSITION.TOP_RIGHT});
        }).catch((error) => {
            if(error.code === 'auth/email-already-in-use') {
              toast.error('Email Already Exists', {position: toast.POSITION.TOP_RIGHT});
            }else{
              toast.error('Some Error Occured', {position: toast.POSITION.TOP_RIGHT});
            }
        })
    }

    //login
    const logInClick = (e) => {
        e.preventDefault();
        logIn(logInEmail, logInPassword).then((creds) => {
            console.log('loggedin',creds);
            navigate('/home');
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

    //password censor eye
    const toggleEye = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className="Body">
            <ToastContainer />
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
                    <FontAwesomeIcon className='google' icon={faGoogle} onClick={signInWithGoogle} />
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
                    </form>
                </div>

                <div className="overlay-container">
                    <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <h4>Already have an Account?</h4>
                        <button className="ghost" id="signIn" onClick={() => {
                        container.current.classList.remove("right-panel-active");}
                        } >Log In</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>Welcome!</h1>
                        <h4>Don't have an account?</h4>
                        <button className="ghost" id="signUp" onClick={() => {
                        container.current.classList.add("right-panel-active");}
                        }>Sign Up</button>
                    </div>
                    </div>
                </div>
            </div>
      </div>
    );
}