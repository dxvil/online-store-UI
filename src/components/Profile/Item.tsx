import React from "react";
import { Card, Typography, CardMedia } from "@mui/material";

export function Item<T>({item}: {item: T}) {
	const header = () => {
		if(item && "title" in item) return item["title"];
		if(item && "name" in item) return item["name"];
	};
	const image = () => {
		if(item && "image" in item) return item["image"];
		if(item && "images" in item) return item["images"][0];
	};


	return (
		<Card 
			sx={{ 
				maxWidth: 250,
				width: 250,
				padding: "1em",
				margin: "1em",
				textAlign: "center" }}>
			<Typography gutterBottom variant="h5" component="div">
				{header()}
			</Typography>
			<CardMedia
				component="img"
				height="140"
				image={image()}
				alt="item image"
			/>
		</Card>
	);
}

