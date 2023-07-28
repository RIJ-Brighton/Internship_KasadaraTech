import React from 'react';
import { Box, Stack,Paper,Typography } from '@mui/material';
import FAN from "../assets/brush_fan_showcase.png";
import FLAT from "../assets/brush_flat_showcase.png";
import POINT from "../assets/brush_point_showcase.png";
import ROUND from "../assets/brush_round_showcase.png";

const showcase = [
    {
        title:"FLAT",
        url:FLAT
    },
    {
        title:"FAN",
        url:FAN
    },
    {
        title:"ROUND",
        url:ROUND
    },
    {
        title:"POINT",
        url:POINT
    },
];


export default function Home(){
    return(
        <>            
            <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",margin:{xs:"20px",md:"90px"}}}>
                <Typography  color="text.secondary" variant='h4'>XYZ Brushes<br></br></Typography>           
            </Box>
            <Stack>
                <Box sx={{display:"flex",flexDirection:{xs:"column",md:"row"},justifyContent:"space-evenly",}} pb={10}>
                {showcase.map((obj, index)=> (
                    <Paper elevation={3} sx={{p:1,borderRadius:"20px"}}>
                        <Box sx={{top:"0",right:"0",textAlign:"center",backdropFilter:("5px"),background:"#1f3d4738",borderRadius:"15px"}}>
                            <Typography component="div" color="text.secondary" variant='h4'><strong>{obj.title}</strong></Typography>
                            <Box key={index} sx={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                                <img className='showcase' src={obj.url} alt='Brush Showcase'/>
                            </Box>
                        </Box>
                    </Paper>
                ))} 
                </Box>
            </Stack>
        </>
    );
}