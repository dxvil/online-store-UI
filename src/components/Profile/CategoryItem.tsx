import React from "react";
import { Card, Typography, CardMedia } from "@mui/material";

export const CategoryItem = ({name, image}: { name: string, image: string}) => {
	return (
		<Card 
			sx={{ 
				maxWidth: 250,
				width: 250,
				padding: "1em",
				margin: "1em",
				textAlign: "center" }}>
			<Typography gutterBottom variant="h5" component="div">
				{name}
			</Typography>
			<CardMedia
				component="img"
				height="140"
				image={image}
				alt="item image"
			/>
		</Card>
	);
};
