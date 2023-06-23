import './App.css';
import { useEffect , useState , useRef } from 'react';
import TextSphere from './TextSphere';

export default function App() {

  //home page images
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
      hill1.current.style.top = (value * 1.5 < 160) ? (value * 1.5 + 'px') : '160px';
    }
      
    window.addEventListener('scroll', onScroll);
    
    return () => {
      window.removeEventListener('scroll', onScroll);
    }
  }, []);

  //pages
  const Home = useRef(null);
  const About = useRef(null);
  const Skills = useRef(null);
  const Contact = useRef(null);


  const handleButtonClick = (ref , e) => {
    e.preventDefault();
    console.log(ref.current.offsetTop);
    window.scrollTo({
      top : ref.current.offsetTop,
      behavior : 'smooth'
    })
  };

  return (
    <div className="App" >
      <header>
        <nav className='navigation' >
          <a href='#' onClick={(e) => handleButtonClick(Home , e)}>Home</a>
          <a href='#' onClick={(e) => handleButtonClick(About , e)}>About</a>
          <a href='#' onClick={(e) => handleButtonClick(Skills , e)}>Skills</a>
          <a href='#' onClick={(e) => handleButtonClick(Contact , e)}>Contact</a>
        </nav>
      </header>
      {/* home */}
      <section className='parallax' ref={Home}>
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
      {/* About */}
      <section className='sec about' ref={About}>
        <h2>About me</h2> <hr/>
        <p>
          <h3>I am Brighton</h3> 
          <h3>Software Developer</h3><br/>
          a 19 years old who's a college student pursuing B.Tech IT at FXEC
          with hobbies like :
          <ul>
            <li>Learning to exploit vulnerabilities</li>
            <li>Playing Guitar</li>
            <li>Watching anime</li>
          </ul>
        </p>
      </section>
      {/* Skills */}
      <section className='sec skills' ref={Skills}>
        <h2>Skills</h2><hr/>
        <TextSphere/>
      </section>

      {/* Contact */}
      <section className='sec contact' ref={Contact}>
        <h2>Contact</h2>
        <img src={require('./asserts/homePage/tree.png')} id='tree' alt='hill'/>
        <img src={require('./asserts/homePage/plant.png')} id='plant' alt='hill'/>
      </section>
    </div>
  );
}