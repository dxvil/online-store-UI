import React from "react";
import { Typography, Box } from "@mui/material";
import styles from "../../assets/styles/Intro.module.css";

const Intro = () => {
	return (
		<Box  className={styles.intro}>
			<Typography  
				className={styles["intro-header"]}
				variant="h3" 
				gutterBottom>
      Haluamme luoda kestäviä tuotteita ympäristöystävällisin menetelmin.
			</Typography>
		</Box>
	);
};

export default Intro;