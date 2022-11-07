import React from "react";
import { addItem, removeItem } from "../../redux/reducers/cartReducer";
import { IProduct } from "../../types/interfaces";
import { IProductError } from "../../types/IAPI";
import { Button, ButtonGroup, Badge, Stack } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxTyped";
import { pink } from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./product.css";

interface IProductCounter {
    product: IProduct | IProductError | null
    isLiked: boolean
    setIsLiked: (x: boolean) => void
}

export const ProductCounter = ({product, isLiked, setIsLiked}: IProductCounter) => {
	const dispatch = useAppDispatch();
	const {items} = useAppSelector((state) => state.cart);
	const currentProduct = items.find((item) => {
		if(product !== null && "id" in product) {
			return item.id === product.id;
		}
		return null;
	});

	const add = (): void => {
		if(product !== null && !("error" in product)){
			dispatch(addItem(product));
		}
	};

	const remove = (): void => {
		dispatch(removeItem(product));
	};

	return (
		<div className="product-buttons">
			{((currentProduct && currentProduct.quintity === 0) || !currentProduct) && 
			<Button 
				onClick={() => add()}
				size="medium"
				className="product-buy-btn"
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
					className="product-counter">
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
	);
};