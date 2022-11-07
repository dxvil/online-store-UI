import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./product.css";
import { ProductGallery } from "./ProductGallery";
import { Box, Typography, Stack } from "@mui/material";
import { NoItem } from "../NoItem/NoItem";
import { BackButton } from "../BackButton/BackButton";
import {ProductCounter} from "./ProductCounter";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxTyped";
import { fetchProduct } from "../../redux/reducers/productsReducer";

export const Product = () => {
	const product = useAppSelector((state) => state.products.product);
	const dispatch = useAppDispatch();
	const [isLiked, setIsLiked] = useState<boolean>(false);
	const { id } = useParams();

	useEffect(() => {
		if(id) {
			dispatch(fetchProduct(Number(id)));
		}
	}, [id]);
	
	if(product !== null && ("error" in product)) {
		return(
			<NoItem 
				link="/products"
				error={product.error}
				message={product.message}
				statusCode={product.statusCode}
			/>
		);
	}

	return (
		<Box className="product">
			<Stack direction="row" spacing={10} flexWrap="wrap">
				{product && "images" in product && product?.images.length !== 0 &&
						<ProductGallery product={product}/>
				}
				<Stack direction="column" className="product-header">
					<Stack direction="row" 
						alignItems="center"
						sx={{margin: "0 0 1.5em 0"}}
						spacing={5} 
						justifyContent="center">
						<BackButton link="/products" />
						<Typography 
							variant="h4" 
							gutterBottom>
							{product && product?.title}
						</Typography>
						<Typography 
							variant="h6" 
							gutterBottom>
							{product && product?.price} Euro
						</Typography>
					</Stack>
					<Typography 
						variant="body1" 
						gutterBottom>
						{product && product?.description}
					</Typography>
					<ProductCounter 
						isLiked={isLiked} 
						setIsLiked={setIsLiked}
						product={product}
					/>
				</Stack>
			</Stack>
		</Box>
	);
};