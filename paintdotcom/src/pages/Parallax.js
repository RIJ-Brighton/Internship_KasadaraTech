import './Parallax.css';
import { useEffect ,useRef } from 'react';
import { Typography } from '@mui/material';

export default function Home() {

  const hill4 = useRef(null);
  const hill5 = useRef(null);
  const text = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      let value = window.scrollY;
      text.current.style.marginTop =  (value * 3.5 < 800) ? (value * 3.5 + 'px') : '800px';
      hill4.current.style.left = value * -1.5 + 'px';
      hill5.current.style.left = value * 1.5 + 'px';

    }
      
    window.addEventListener('scroll', onScroll);
    
    return () => {
      window.removeEventListener('scroll', onScroll);
    }
  }, []);

  return (
    <section className='parallax'>
      <img style={{zIndex:"10"}} src={require('../assets/brush_left.png')} id='hill4'   ref={hill4} alt='hill'/>
      <img src={require('../assets/brush_right.png')} id='hill5' ref={hill5} alt='hill'/>
      <Typography sx={{textAlign:"center",zIndex:"1"}} color="text.primary" variant='h1' ref={text}>
        <strong>XYC Brushes</strong>
        <Typography color="text.primary" variant='h3'>Quality over Quantity</Typography>
      </Typography>
    </section>
  );
}