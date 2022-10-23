import React from "react";
import { Box, IconButton , Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";


const Menu = () => {
	return (
		<Box className="menu">
			<Typography sx={{ minWidth: 100 }}>Products</Typography>
			<Typography sx={{ minWidth: 100 }}>Profile</Typography>
			<IconButton>
				<ShoppingCartIcon />
			</IconButton>
		</Box>
	);
};

export default Menu;