import { useUserAuth } from '../context/UserAuthContext'; 
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({component}){

    const { user } = useUserAuth();
    console.log('Inside protected route',user);

    if(user === null) return <Navigate to='/' />

    return component;
}