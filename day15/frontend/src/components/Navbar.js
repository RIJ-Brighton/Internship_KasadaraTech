import { AppBar, Toolbar, Typography, Box, IconButton } from '@mui/material'
import NightlightIcon from '@mui/icons-material/Nightlight';
import Brightness7Icon from '@mui/icons-material/Brightness7';

export default function Navbar({themeSetter ,themeIcon}) {
  return (
    <Box mb={3}>
    <AppBar className='nav' position='sticky'>
      <Toolbar sx={
        {display:'flex',
        justifyContent:'space-between'}
      }>
        <Typography variant='h5'><strong>Task Manager</strong></Typography>
        <Box sx={{display:'flex',allignItems:'center',gap:'10px'}}>
          <IconButton onClick={() => themeSetter(t => t === 'light' ? 'dark' : 'light')}>
            {themeIcon === 'dark' ?  <NightlightIcon/> : <Brightness7Icon/>}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
    </Box>       
  )
}