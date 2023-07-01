import { BrowserRouter , Route , Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar';
import { Box, ThemeProvider, createTheme } from '@mui/material';
import { useState } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {

  const [ theme , setTheme ] = useState('light');
  
  const Theme = createTheme({
    palette:{
      mode:theme
    }
  })

  return (
  <ThemeProvider theme={Theme}>
    <Box bgcolor={'background.default'} color={'text.primary'}>
        <BrowserRouter>
          <Navbar themeSetter={setTheme} themeIcon={theme}/>
            <Routes>
              <Route exact path='/' element={<Home/>} />
            </Routes>
            <Routes>
              <Route path='/login' element={<Login/>} />
            </Routes>
            <Routes>
              <Route path='/signup' element={<Signup/>} />
            </Routes>
        </BrowserRouter>
    </Box>
    </ThemeProvider>
  );
}

export default App;
