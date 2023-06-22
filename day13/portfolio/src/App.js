import './App.css';
import { useEffect , useState , useRef } from 'react';

export default function App() {

  const hill1 = useRef(null);
  const hill4 = useRef(null);
  const hill5 = useRef(null);
  const leaf = useRef(null);
  const text = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      let value = window.scrollY;
      text.current.style.marginTop =  (value * 3.5 < 1070) ? (value * 3.5 + 'px') : '1070px';
      leaf.current.style.top = value * -1.5 + 'px';
      leaf.current.style.left = value * 1.5 + 'px';
      hill4.current.style.left = value * -1.5 + 'px';
      hill5.current.style.left = value * 1.5 + 'px';
      hill1.current.style.top = (value * 1.5 < 760) ? (value * 1.5 + 'px') : '760px';
    }
      
    window.addEventListener('scroll', onScroll);
    
    return () => {
      window.removeEventListener('scroll', onScroll);
    }
  }, []);

  return (
    <div className="App" >
      <header>
        <h2 className='logo' >Hello</h2>
        <nav className='navigation' >
          <a href='#' >Home</a>
          <a href='#' >About me</a>
          <a href='#' >Known Tech Stack</a>
          <a href='#' >Contact</a>
        </nav>
      </header>

      <section className='parallax' >
        <img src={require('./asserts/homePage/hill1.png')} id='hill1' ref={hill1} alt='hill'/>
        <img src={require('./asserts/homePage/hill2.png')} id='hill2' alt='hill'/>
        <img src={require('./asserts/homePage/hill3.png')} id='hill3' alt='hill'/>
        <img src={require('./asserts/homePage/hill4.png')} id='hill4' ref={hill4} alt='hill'/>
        <img src={require('./asserts/homePage/hill5.png')} id='hill5' ref={hill5} alt='hill'/>
        <img src={require('./asserts/homePage/tree.png')} id='tree' alt='hill'/>
        <h2 id='text' ref={text}>Hello There,</h2>
        <img src={require('./asserts/homePage/leaf.png')} id='leaf' ref={leaf} alt='hill'/>
        <img src={require('./asserts/homePage/plant.png')} id='plant' alt='hill'/>
      </section>

      <section className='sec'>
        <h2>About me</h2>
        <p>
          I am Brighton, <br/><br/>
          a 19 years old who's a college student pursuing B.Tech IT at FXEC <br/><br/>
          My hobbies are :
          <ul>
            <li>Learning to exploit vulnerabilities</li>
            <li>Playing Guitar</li>
            <li>Watching anime</li>
          </ul>
        </p>
      </section>
    </div>
  );
}