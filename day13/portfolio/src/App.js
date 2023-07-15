import './App.css';
import { useEffect , useState , useRef } from 'react';
import TextSphere from './TextSphere';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub , faLinkedin } from '@fortawesome/free-brands-svg-icons';

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
        <h2>About me</h2>
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
        <h2>Skills</h2><br/>
        <TextSphere/>
      </section>

      {/* Contact */}
      <section className='sec contact' ref={Contact}>
      <div className="contact_us_green">
        <div className="responsive-container-block big-container">
          <div className="responsive-container-block container">
            <div className="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-7 wk-ipadp-10 line" id="i69b-2">
              <form className="form-box">
                <div className="container-block form-wrapper">
                  <div className="head-text-box">
                    <p className="text-blk contactus-head">
                      Contact me
                    </p>
                    <p className="text-blk contactus-subhead">
                      Get in touch with me
                    </p>
                  </div>
                  <div className="responsive-container-block">
                    <div className="responsive-cell-block wk-ipadp-6 wk-tab-12 wk-mobile-12 wk-desk-6" id="i10mt-6">
                      <p className="text-blk input-title">
                        FIRST NAME
                      </p>
                      <input className="input" id="ijowk-6" name="FirstName"/>
                    </div>
                    <div className="responsive-cell-block wk-desk-6 wk-ipadp-6 wk-tab-12 wk-mobile-12">
                      <p className="text-blk input-title">
                        LAST NAME
                      </p>
                      <input className="input" id="indfi-4" name="Last Name"/>
                    </div>
                    <div className="responsive-cell-block wk-desk-6 wk-ipadp-6 wk-tab-12 wk-mobile-12">
                      <p className="text-blk input-title">
                        EMAIL
                      </p>
                      <input className="input" id="ipmgh-6" name="Email"/>
                    </div>
                    <div className="responsive-cell-block wk-desk-6 wk-ipadp-6 wk-tab-12 wk-mobile-12">
                      <p className="text-blk input-title">
                        PHONE NUMBER
                      </p>
                      <input className="input" id="imgis-5" name="PhoneNumber"/>
                    </div>
                    <div className="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12" id="i634i-6">
                      <p className="text-blk input-title">
                        WHAT DO YOU HAVE IN MIND
                      </p>
                      <textarea className="textinput" id="i5vyy-6"></textarea>
                    </div>
                  </div>
                  <div className="btn-wrapper">
                    <button className="submit-btn">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-5 wk-ipadp-10" id="ifgi">
              <div className="container-box">
                <div className="text-content">
                  <p className="text-blk contactus-head">
                    Contact me
                  </p>
                  <p className="text-blk contactus-subhead">
                    Get in touch with me  
                  </p>
                </div>
                <div className="workik-contact-bigbox">
                  <div className="workik-contact-box">
                    {/* <div className="phone text-box">
                      <img className="contact-svg" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/ET21.jpg"/>
                      <p className="contact-text">
                        8438087292
                      </p>
                    </div> */}
                    <div className="address text-box">
                      <img className="contact-svg" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/ET22.jpg"/>
                      <p className="contact-text">
                        rijbrighton@gmail.com
                      </p>
                    </div>
                    <div className="mail text-box">
                      <img className="contact-svg" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/ET23.jpg"/>
                      <p className="contact-text">
                        Tirunelveli, Tamilnadu
                      </p>
                    </div>
                  </div>
                  <div className="social-media-links">
                    <a href="https://github.com/RIJ-Brighton">
                    <FontAwesomeIcon icon={faGithub} className="social-svg" />
                    </a>

                    <a href="https://www.linkedin.com/in/rijbrighton/">
                    <FontAwesomeIcon icon={faLinkedin} className="social-svg" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>
    </div>
  );
}