import { AppBar, Toolbar, Typography, Box, IconButton, Stack } from '@mui/material'
import NightlightIcon from '@mui/icons-material/Nightlight';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import {add} from '../pages/Home';
import Sidebar from "./Sidebar";
import { useContext } from 'react';


export default function Navbar({themeSetter ,themeIcon}) {
  const {setSideBar} = useContext(add);

  return (
    <Box mb={3}>
      <AppBar className='nav' position='sticky' sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[400]
            : theme.palette.grey[900],
      }}>
        <Toolbar sx={{justifyContent:"space-between"}}>
          <MenuIcon onClick={()=>{setSideBar(true)}}/>
          <Typography color="text.primary" sx={{fontSize:{xs:"1rem",md:"2rem"}}}><strong>Paint.comm</strong></Typography>
          <Stack > 
            <div id="google_translate_element"></div>
          </Stack>
            <IconButton onClick={() => {
              themeSetter(t => t === 'light' ? 'dark' : 'light')
            }}>
              {themeIcon === 'dark' ?  <NightlightIcon/> : <Brightness7Icon/>}
            </IconButton>    
        </Toolbar>
      </AppBar>
      <Sidebar/>
    </Box>       
  )
}