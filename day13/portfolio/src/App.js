import './App.css';
import { Parallax , ParallaxLayer } from '@react-spring/parallax';

export default function App() {
  return (
    <div className="App">
      <Parallax pages={2} style={{ top: '0', left: '0' }} class="animation">

        <ParallaxLayer offset={0} speed={0.25}>
          <div class="animation_layer parallax" id="hill1"></div>
        </ParallaxLayer>

        <ParallaxLayer offset={0} speed={-0.1}>
          <div class="animation_layer parallax" id="hill2"></div>
        </ParallaxLayer>

        <ParallaxLayer offset={0} speed={0.3}>
          <div class="animation_layer parallax" id="hill3"></div>
        </ParallaxLayer>

        <ParallaxLayer offset={0} speed={0.2}>
          <div class="animation_layer parallax" id="hill4"></div>
        </ParallaxLayer>

        <ParallaxLayer offset={0} speed={0.5}>
          <div class="animation_layer parallax" id="hill5"></div>
        </ParallaxLayer>

        <ParallaxLayer offset={0} speed={0.2}>
          <div class="animation_layer parallax" id="tree"></div>
        </ParallaxLayer>

        <ParallaxLayer offset={0} speed={-0.5}>
          <div class="animation_layer parallax" id="plant"></div>
        </ParallaxLayer>

        <ParallaxLayer offset={0} speed={-0.2}>
          <div class="animation_layer parallax" id="leaf"></div>
        </ParallaxLayer>

      </Parallax>
    </div>
  );
}
 
