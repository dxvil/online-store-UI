import React from "react";
import { Typography, Box } from "@mui/material";
import "./intro.css";
const Intro = () => {
	return (
		<Box  className="intro">
			<Typography  className="intro-header" variant="h3" gutterBottom>
      Haluamme luoda kestäviä tuotteita ympäristöystävällisin menetelmin.
			</Typography>
		</Box>
	);
};

export default Intro;