import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./product.css";
import { api } from "../../api/API";
import { ProductGallery } from "./ProductGallery";
import { Box, Typography, Stack, Button } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { NoItem } from "../NoItem/NoItem";
import { BackButton } from "../BackButton/BackButton";
import { pink } from "@mui/material/colors";
import { IProduct } from "../../types/interfaces";
import { IProductError } from "../../types/IAPI";

export const Product = () => {
	const [product, setProduct] = useState<IProduct | IProductError | null>(null);
	const [isLiked, setIsLiked] = useState<boolean>(false);
	const { id } = useParams();

	useEffect(() => {
		if(id) {
			api.products.get(Number(id)).then((res): void => {
				if (res) {
					setProduct(res);
					return;
				}
			});
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
					<div className="product-buttons">
						<Button 
							size="medium"
							className="product-buy-btn"
							variant="contained">
							Buy
						</Button>
						<Button 
							onClick={() => setIsLiked(!isLiked)}
							className="product-like-btn"
							variant="outlined">
							{isLiked 
								? <FavoriteIcon sx={{ color: pink[500] }} /> 
								: <FavoriteBorderIcon sx={{ color: pink[500] }} />
							}
						</Button>
					</div>
				</Stack>
			</Stack>
		</Box>
	);
};