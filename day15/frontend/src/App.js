import { BrowserRouter , Route , Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar';
import { Box, ThemeProvider, createTheme } from '@mui/material';
import { useState } from 'react';

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
          <div className='pages'>
            <Routes>
              <Route path='/' element={<Home/>} />
            </Routes>
          </div>
        </BrowserRouter>
    </Box>
    </ThemeProvider>
  );
}

export default App;
