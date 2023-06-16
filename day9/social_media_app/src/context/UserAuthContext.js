import { createContext, useContext, useEffect, useState } from 'react'
import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup
 } from 'firebase/auth'
import { auth } from '../firebase';

const userAuthContext = createContext();

export function UseAuthContextProvider( { children } ){

    const [ user , setUser ] = useState({});

    useEffect(() => {
        const s = onAuthStateChanged(auth, (cur) => {
          console.log('changed');
          setUser(cur);
        });
      
        return () => s();
    }, []);
    
    const provider = new GoogleAuthProvider();
    function signInWithGoogle() {
    signInWithPopup(auth, provider).then((res) => {
        localStorage.setItem('profile' , res.user.photoURL);
        return true;
    }).catch((error) => {
        console.log(error);
        return false;
    });
    };

    function logIn(email, password){
        return signInWithEmailAndPassword(auth, email, password);
    }

    function signUp(email, password){
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function logOut(){
        return signOut(auth);
    }
    
    return <userAuthContext.Provider value={{logIn, signUp, logOut, signInWithGoogle, user}}>{children}</userAuthContext.Provider>
}

export function useUserAuth(){
    return useContext(userAuthContext);
}