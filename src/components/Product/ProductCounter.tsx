import React from "react";
import { addItem, removeItem } from "../../redux/reducers/cartReducer";
import { Button, ButtonGroup, Badge, Stack } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxTyped";
import { pink } from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import styles from "../../assets/styles/Product.module.css";
import { IProductCounter } from "../../types/interfaces";

export const ProductCounter = ({product, isLiked, setIsLiked}: IProductCounter) => {
	const dispatch = useAppDispatch();
	const {items} = useAppSelector((state) => state.cart);
	const currentProduct = items.find((item) => {
		if(product && "id" in product) {
			return item.id === product["id"];
		}
		return null;
	});

	const add = (): void => {
		if(product  && !("error" in product)) {
			dispatch(addItem(product));
		}
	};

	const remove = (): void => {
		dispatch(removeItem(product));
	};

	return (
		<div className={styles["product-buttons"]}>
			{((currentProduct && currentProduct.quintity === 0) || !currentProduct) && 
			<Button 
				onClick={() => add()}
				size="medium"
				className={styles["product-buy-btn"]}
				variant="contained"
			>
			Buy
			</Button>
			}
			{currentProduct && currentProduct.quintity > 0 && 
				<Stack 
					direction="row" 
					spacing={4} 
					alignItems="center" 
					className={styles["product-counter"]}>
					<Badge 
						color="secondary" 
						badgeContent={currentProduct.quintity}>
						<ShoppingCartIcon />
					</Badge>
					<ButtonGroup>
						<Button 
							onClick={() => remove()}
							aria-label="reduce"
						>
							<RemoveIcon fontSize="small" />
						</Button>
						<Button 
							onClick={() => add()}
							aria-label="increase"
						>
							<AddIcon fontSize="small" />
						</Button>
					</ButtonGroup>
				</Stack>
			}
			{isLiked && <Button
				onClick={() => setIsLiked && setIsLiked(!isLiked)}
				className={styles["product-like-btn"]}
				variant="outlined">
				{isLiked 
					? <FavoriteIcon sx={{ color: pink[500] }} /> 
					: <FavoriteBorderIcon sx={{ color: pink[500] }} />
				}
			</Button>
			}
		</div>
	);
};
