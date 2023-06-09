import './App.css';
import React, { useState } from 'react';
import Card from './Card';
import Axios from 'axios';

export default function App() {
  const [ip, setip] = useState('');
  const [gender, setGender] = useState();

  function handleIP(e){
    let gen = '';
    Axios.get("https://gender-api.com/get?name="+ip+"&key=vc8s4ojV3RcUey6WEzf77cHYWrHsKSaF52sV").then(res => {
      console.log(res);
      switch(res.data.gender){
        case 'male':
          gen = 'm'; break;
        case 'female':
          gen = 'f'; break;
        default:
          gen = ''; break;
      }
      setip(res.data.name_sanitized)
      setGender(gen)
    })
  }
  
  return (
    <div className="App">
      <h1 className="Title" title="Create Custom Name Cards">Create Cards</h1>
      <div className="input">
        <input id="inputtField" type="text" placeholder="  Enter your name" title="Input Name" onChange={e => {
          setip(e.target.value);
        }}></input>
        <button className='btn' type="button" title="Generate Card" onClick={handleIP} >Create</button>
      </div>
       {(ip && gender) && <Card name = {ip}  gen = {gender}/>}
    </div>
  );
}