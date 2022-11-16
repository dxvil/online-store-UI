import React, { useState, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "../../assets/styles/Product.module.css";
import { ProductGallery } from "./ProductGallery";
import { Box, Typography, Stack } from "@mui/material";
import { NoItem } from "../NoItem";
import { BackButton } from "../BackButton";
import {ProductCounter} from "./ProductCounter";
import { FETCH_STATES } from "../../redux/reducers/productsReducer";
import { Loader } from "../Loader";
import { api } from "../../api/api";
import { FetchStatus } from "../../types/redux";
import { IProduct } from "../../types/interfaces";
import { IProductError } from "../../types/IAPI";

export const Product = () => {
	const [isLiked, setIsLiked] =useState<boolean>(false);
	const { id } = useParams();
	const [singleProductStage, setSingleProductStage] = useState<FetchStatus>(FETCH_STATES.NOT_STARTED);
	const [product, setProduct] = useState<IProduct | IProductError | undefined>();
	const loadProduct = async () => {
		if(id) {
			setSingleProductStage(FETCH_STATES.PENDING);
			const res = await api.products.get(+id);
			setProduct(res);
			setSingleProductStage(FETCH_STATES.DONE);
		}
	};

	useEffect(() => {
		loadProduct();
	}, []);
	
	if(product && ("error" in product)) {
		return(
			<NoItem 
				link="/products"
				error={"error" in product ? product["error"] : ""}
				message={"message" in product ? product["message"] : ""}
				statusCode={"statusCode" in product ? product["statusCode"] : 418}
			/>
		);
	}

	if(singleProductStage === FETCH_STATES.PENDING) {
		return(
			<Loader />
		);
	}
	return (
		<Box className={styles.product}>
			<Stack 
				direction="row" 
				spacing={10} 
				flexWrap="wrap">
				{product && "images" in product &&
						<ProductGallery product={product && product}/>
				}
				<Stack 
					direction="column" 
					className={styles["product-header"]}>
					<Stack 
						direction="row" 
						alignItems="center"
						sx={{margin: "0 0 1.5em 0"}}
						spacing={5} 
						justifyContent="center">
						<BackButton link="/products" />
						<Typography 
							variant="h4" 
							gutterBottom>
							{product && "title" in product ? product["title"] : ""}
						</Typography>
						<Typography 
							variant="h6" 
							gutterBottom>
							{product && "price" in product ? product["price"] : ""} Euro
						</Typography>
					</Stack>
					<Typography 
						variant="body1" 
						gutterBottom>
						{product && "description" in product ? product["description"] : ""}
					</Typography>
					<ProductCounter 
						isLiked={isLiked} 
						setIsLiked={setIsLiked}
						product={product && product}
					/>
				</Stack>
			</Stack>
		</Box>
	);
};