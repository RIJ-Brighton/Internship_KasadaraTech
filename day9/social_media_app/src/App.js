import './App.css';
import { BrowserRouter , Route , Routes } from 'react-router-dom';

import LoginSignup from './components/LoginSignup';
import Home from './components/Home';
import Profile from './components/Profile';

import { UseAuthContextProvider } from './context/UserAuthContext';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <UseAuthContextProvider>
        <Routes>
          <Route path='/home' element={<ProtectedRoute component={<Home/>} />} />
          <Route path='/profile' element={<ProtectedRoute component={<Profile/>} />} />
          <Route exact path='/' element={<LoginSignup />} />
        </Routes>
        </UseAuthContextProvider>
    </BrowserRouter>
  );
}
