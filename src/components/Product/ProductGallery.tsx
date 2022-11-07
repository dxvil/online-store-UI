import React, { useEffect, useState } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Button, Box } from "@mui/material";
import { IProduct } from "../../types/interfaces";
import styles from "../../assets/styles/Product.module.css";

export const ProductGallery = ({product}: {product: IProduct}) => {
	const [images, setImages] = useState<string[]>([]);
	const [productImage, setProductImage] = useState<number>(0);

	useEffect(() => {
		if(product && product.images.length !== 0) {
			setImages(product.images);
		}
	}, [product]);

	const increaseCounter = () => {
		if(product && product.images) {
			if((product?.images.length - 1) > productImage) {
				setProductImage(productImage + 1);
			} else {
				setProductImage(0);
			}
		}
	};

	const decreaseCounter = () => {
		if(product && product.images) {
			if(productImage > 0) {
				setProductImage(productImage - 1);
			} else {
				setProductImage(product.images.length - 1);
			}
		}
	};

	const onImageChange = (index: number) => {
		setProductImage(index);
	};

	return (
		<Box className={styles["product-img-box"]}>
			<div className={styles["product-images"]}>
				<img 
					className={styles["product-img"]}
					src={images[productImage]} 
					alt="Product image"/>
				<div className={styles["product-additional-images"]}>
					<Button 
						size="small"
						className={styles["product-img-btn"]}
						onClick={decreaseCounter}
						color="primary" aria-label="change picture"
					>
						<ArrowUpwardIcon />
					</Button>
					{images.map((image, i) => {
						if(i !== productImage){
							return(
								<button className={styles["extra-img-btn"]}
									key={i}
									onClick={() => onImageChange(i)}
								>
									<img 
										className={styles["product-img"]}
										src={image} 
										alt="Product image"/>
								</button>
							);
						}
					})}
					<Button
						size="small"
						className={styles["product-img-btn"]}
						onClick={increaseCounter}
						color="primary" aria-label="change picture"
					>
						<ArrowDownwardIcon />
					</Button>
				</div>
			</div>
		</Box>				
	);
};
