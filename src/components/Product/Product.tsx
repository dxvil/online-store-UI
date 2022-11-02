import React, { useEffect, useState } from "react";
import { Box, Typography, Stack } from "@mui/material";
import "./product.css";
import {api} from "../../api/API";
import {ProductGallery} from "./ProductGallery";

interface ICategory {
	id: number
	name: string
	image: string
}
export interface IProduct {
	id: number
	title: string
	price: number
	description: string
	category: ICategory
	images: string[]
}
export const Product = () => {
	const [product, setProduct] = useState<null | IProduct>(null);
	
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
				</Stack>
			</Stack>
		</Box>
	);
};