import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { IProduct } from "../../types/interfaces";
import "./product.css";

export const ProductItem = ({item}: {item: IProduct}) => {
	return (
		<Link to={`/products/${item.id}`}>
			<div className="product-item">
				<img className="product-item-image" src={item.images[0]}/>
				<Typography variant="h6">
					{item.title}
				</Typography>
				<Typography variant="subtitle1">{item.price} Euro</Typography>
			</div>
		</Link>
	);
};
