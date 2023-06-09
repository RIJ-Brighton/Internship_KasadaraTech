import './App.css';
import React, { useState } from 'react';

function App() {
  var theme = 0;

  return (
    <div className="App">
      <h1>Multiplication Table</h1>
      {CountInc()}
      <button type="button" className ="themeButton" onClick = {() => {
        if(theme) 
        {
          document.getElementsByClassName("themeButton")[0].innerHTML =  'Light';
          document.getElementsByClassName("App")[0].style.color = 'white';
          document.getElementsByClassName("App")[0].style.backgroundColor = 'black';
        }else{
          document.getElementsByClassName("themeButton")[0].innerHTML =  'Dark';
          document.getElementsByClassName("App")[0].style.backgroundColor = 'white';
          document.getElementsByClassName("App")[0].style.color = 'black';
        }
        theme = !theme;
      }} >Light</button>
    
    </div>
  );
}

function mult(n){
  var s = "";
  for(let i = 1 ; i <= 10 ; i++){
    s += i + ' x ' + n + ' = ' + i*n + '\n';
  }
  return s;
}

function CountInc() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Multiplication Table for {count}</p>
      <h4>{mult(count)}</h4>
      <button onClick={() => setCount(count + 1)}>
        Inc. Table
      </button>
    </div>
  );
}

export default App;
