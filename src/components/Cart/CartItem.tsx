import React from "react";
import { Typography, Card, CardContent, CardMedia, CardActions } from "@mui/material";
import { IProduct } from "../../types/interfaces";
import { ProductCounter } from "../Product/ProductCounter";
import { Link } from "react-router-dom";

export const CartItem = ({item}: {item: IProduct}) => {
	return (
		<Card sx={{ maxWidth: 345, width: 345, margin: "2em" }} key={item.id}>
			<Link to={`/products/${item.id}`} >
				<CardMedia
					component="img"
					height="140"
					image={item.images[0]}
					alt="item image"
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{item.title} {item.price} Euro
					</Typography>
				</CardContent>
			</Link>
			<CardActions>
				<ProductCounter product={item} />
			</CardActions>
		</Card>
	);
};
