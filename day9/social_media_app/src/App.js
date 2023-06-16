import './App.css';
import { BrowserRouter , Route , Routes } from 'react-router-dom';

import LoginSignup from './components/LoginSignup';
import Home from './components/Home';
import { UseAuthContextProvider } from './context/UserAuthContext';

export default function App() {
  return (
    <BrowserRouter>
      <UseAuthContextProvider>
        <Routes>
          <Route exact path='/' element={<LoginSignup />} />
          <Route path='/home' element={<Home/>} />
        </Routes>
        </UseAuthContextProvider>
    </BrowserRouter>
  );
}
