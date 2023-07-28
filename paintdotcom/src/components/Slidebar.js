import { Box } from '@mui/material';
import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import fanbrush from "../assets/fanbrush.jpg";
import brushes from "../assets/brushes.jpg";
import canvas from "../assets/canvas.jpg";
import color_pencil from "../assets/color-pencil.jpg";
import Marker from "../assets/Marker.jpg";
import oil_paint from "../assets/oil-paint.jpg";
import pastel from "../assets/pastel.jpg";
import pencil from "../assets/pencil.jpg";
import watercolor from "../assets/watercolor.jpg";

const slideImages = [
  {
    url:brushes ,
  },
  {
    url:fanbrush ,
  },
  {
    url:canvas ,
  },
  {
    url:color_pencil ,
  },
  {
    url:Marker ,
  },
  {
    url:oil_paint ,
  },
  {
    url:pastel ,
  },
  {
    url:pencil ,
  },
  {
    url:watercolor ,
  },
];

export default function Slidebar() {
    return (
        <Slide >
         {slideImages.map((slideImage, index)=> (
            <Box key={index} sx={{display:"flex",justifyContent:"center",alignItems:"center"}}>
              <img className='slideimages' src={slideImage.url} alt='art supplies'/>
            </Box>
          ))} 
        </Slide>
    )
}