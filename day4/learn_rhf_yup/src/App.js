import './App.css';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Error from './Error';

function App() {

  return (
    <Router>

      <Routes>
        <Route path='/' element={ <Home/> } />
        <Route path='/login' element={ <Login/> } />
        <Route path='/*' element={ <Error/> } />
      </Routes>

    </Router>
  );
}

export default App;
