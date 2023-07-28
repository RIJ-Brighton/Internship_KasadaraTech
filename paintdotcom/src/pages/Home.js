import { useState , createContext } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Stack, ThemeProvider, createTheme } from '@mui/material';

import NavBar from '../components/Navbar';
import Slidebar from '../components/Slidebar';
import Footer from '../components/Footer';
import HomeBody from './HomeBody';
import Parallax from './Parallax';


export const add=createContext();
function App() {
  const [ theme , setTheme ] = useState('light');
  const Theme = createTheme({
    palette:{
      mode:theme
    }
  })
  const [sideBar, setSideBar] = useState(false);
  return (
    <ThemeProvider theme={Theme}>
      <Box>
          <add.Provider value={{sideBar,setSideBar}}>
            <CssBaseline/>
              <Box sx={{position:"fixed",top:"0",zIndex:"100",width:"100vw",height:{xs:"10vw",md:"4vw"}}} bgcolor={'background.default'} color={'text.primary'}>
                    <NavBar themeSetter={setTheme} themeIcon={theme}/>
              </Box>
          </add.Provider>
          
          <Parallax/>
        <Box sx={{zIndex:"5"}}>  
            <Stack sx={{position:"relative",justifyContent:"center",alignItems:"center"}} pt={10}>
                <Box sx={{width:{xs:"100vw",md:"50vw"},borderRadius:"20px"}} ClassName="slidebar">
                    <Slidebar/>
                </Box>
            </Stack>
            <HomeBody/>
            <Footer/>
        </Box>
        
      </Box>
    </ThemeProvider>
  );
}

export default App;
