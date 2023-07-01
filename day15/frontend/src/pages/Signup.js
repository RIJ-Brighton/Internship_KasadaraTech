import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios'
import { useUserContext } from '../context/userContext';

export default function Signup() {
    
  const [ username , setUsername ] = useState(null)
  const [ password , setPassword ] = useState(null)
  const [ email , setEmail ] = useState(null)
  const [ error , setError ] = useState(null)

  const { dispatch } = useUserContext()

  const handleSubmit = async (e) => {
        e.preventDefault();
        if(!username || !email || !password){
            return;
        }
        //signup api call
        const data = {
            username:username,
            email:email,
            password:password
        }
        try{
            const res = await axios.post('http://localhost:4000/api/user/signup',data)
            if(res.status === 200){
                setError(null);
                dispatch({type:'Login' , payload:res.data})
                console.log("USERNAME : ",res.data.username,"Token : ",res.data.token)
                localStorage.setItem('username',res.data.username)
                localStorage.setItem('token',res.data.token)
            }
            if(res.status === 400){
                setError(res.data)
            }
        }catch(e){
            setError(e.response.data.error)
            console.log('Error',e.response.data.error)
        }
    };

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box display='flex' alignItems='center'>
            <Avatar sx={{ m: 1 , backgroundColor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              <strong>Sign Up</strong>
            </Typography>
          </Box>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={e => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="example@gmail.com"
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
          <Link to='/login'><Typography variant='h6' color='primary'>LogIn</Typography></Link>
        </Box>
        {error && error}
      </Container>
  );
}