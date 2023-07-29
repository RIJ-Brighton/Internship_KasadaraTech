import React, { useState } from 'react';
import { Box, Stack, Paper, Typography } from '@mui/material';
import FAN from "../assets/brush_fan_showcase.png";
import FLAT from "../assets/brush_flat_showcase.png";
import POINT from "../assets/brush_point_showcase.png";
import ROUND from "../assets/brush_round_showcase.png";

const showcase = [
  {
    title: "FLAT",
    message: "Flat brush blah blah blah",
    url: FLAT
  },
  {
    title: "FAN",
    message: "Fan brush blah blah blah",
    url: FAN
  },
  {
    title: "ROUND",
    message: "Round brush blah blah blah",
    url: ROUND
  },
  {
    title: "POINT",
    message: "Point brush blah blah blah",
    url: POINT
  },
];

export default function Home() {
  const [hoveredBrush, setHoveredBrush] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredBrush(index);
  };

  const handleMouseLeave = () => {
    setHoveredBrush(null);
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", margin: { xs: "20px", md: "90px" } }}>
        <Typography color="text.secondary" variant='h4'>XYZ Brushes<br></br></Typography>
      </Box>
      <Stack>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-evenly" }} pb={10}>
          {showcase.map((obj, index) => (
            <Paper
              key={index}
              elevation={3}
              sx={{
                p: 1,
                borderRadius: "20px",
                position: "relative",
                cursor: "pointer",
                "&:hover div.description": {
                  visibility: "visible",
                },
              }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <Box sx={{ top: "0", right: "0", textAlign: "center", backdropFilter: ("5px"), background: "#1f3d4738", borderRadius: "15px" }}>
                <Typography component="div" color="text.secondary" variant='h4'><strong>{obj.title}</strong></Typography>
                <Box key={index} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <img style={{ borderTopRightRadius: "20px", borderTopLeftRadius: "20px", filter: hoveredBrush === index ? "blur(2px)" : "none" }} className='showcase' src={obj.url} alt='Brush Showcase' />
                </Box>
                {hoveredBrush === index && (
                  <Box className="description" sx={{ visibility: "visible", position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Typography sx={{color:"black", textAlign:"center"}} variant='h5'>{obj.message}</Typography>
                  </Box>
                )}
              </Box>
            </Paper>
          ))}
        </Box>
      </Stack>
    </>
  );
}
