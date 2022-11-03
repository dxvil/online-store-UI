import React, { useEffect, useState } from "react";
import { Box, Typography, Stack, Button } from "@mui/material";
import "./product.css";
import {api} from "../../api/API";
import {ProductGallery} from "./ProductGallery";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { pink } from "@mui/material/colors";
import { IProduct } from "../../types/interfaces";

export const Product = () => {
	const [product, setProduct] = useState<null | IProduct>(null);
	const [isLiked, setIsLiked] = useState<boolean>(false);

	useEffect(() => {
		api.products.get(20).then((res: any) => {
			if(res !== null) {
				setProduct(res);
			}
			
		});
	}, []);

	return (
		<Box className="product">
			<Stack direction="row" spacing={10} flexWrap="wrap">
				{product && product.images?.length !== 0 &&
					<ProductGallery product={product}/>
				}
				<Stack direction="column" className="product-header">
					<Stack direction="row" 
						alignItems="center"
						spacing={10} 
						justifyContent="center">
						<Typography 
							variant="h4" 
							gutterBottom>
							{product && product.title}
						</Typography>
						<Typography 
							variant="h6" 
							gutterBottom>
							{product && product.price} Euro
						</Typography>
					</Stack>
					<Typography 
						variant="body1" 
						gutterBottom>
						{product && product.description}
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