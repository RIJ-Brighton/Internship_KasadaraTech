import React from 'react';
import './Card.css';
import otoko from './img_avatar.png';
import onna from './img_avatar2.png';

export default function Card({name, gen}){
    console.log(name, gen);
    
    return (
    <div className="card">
        <div className="content" title="Name Card">
            <img src={ (gen === 'm') ? otoko : onna } alt="Avatar"/>
            <div className="container">
                <h4 className="txt"><b>{name}</b></h4> 
            </div>
        </div>
    </div>
    );
}