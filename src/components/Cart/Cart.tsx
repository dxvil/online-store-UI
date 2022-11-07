import React from "react";
import { Stack, Alert, Typography, Button } from "@mui/material";
import { useAppSelector } from "../../hooks/reduxTyped";
import { BackButton } from "../BackButton/BackButton";
import { CartItem } from "./CartItem";


export const Cart = () => {
	const items = useAppSelector((state) => state.cart.items);
	const quintity = useAppSelector((state) => state.cart.price);

	if(items.length === 0) {
		return(
			<Stack 
				sx={{margin: "5em 0 0 0"}}
				direction="row" 
				alignItems="center"
				justifyContent="center"
				spacing={5}>
				<BackButton link="/products" />
				<Alert severity="info">
                    Your cart is empty.
                    Go shopping!
				</Alert>
				
			</Stack>
		);
	}

	return (
		<Stack 
			direction="column"
			justifyContent="center"
			alignItems="center"
			spacing={5}
			sx={{margin: "5em 0 0 0"}}
		>
			<Stack 
				direction="row"
				justifyContent="center"
				alignItems="center"
				sx={{flexWrap: "wrap"}}
				spacing={5}>
				{items.map((item) => {
					return(
						<CartItem item={item} key={item.id} />
					);
				})}
			</Stack>
			<Typography variant="h4" gutterBottom>
				Total: {quintity}
			</Typography>
			<Button variant="contained" style={{margin: "3em 0"}}>
				Confirm purchase
			</Button>
		</Stack>
	);
};
