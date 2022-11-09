import React from "react";
import { MenuList, MenuItem } from "@mui/material";

export const ProfileMenu = () => {
	const onHash = (hash: string) => {
		window.location.hash = `#${hash}`;
	};
	return (
		<MenuList 
			sx={{fontSize: "2em", width: "10%"}}
			id="composition-menu"
			aria-labelledby="composition-button">
			<MenuItem onClick={() => onHash("products")}>
			Products
			</MenuItem>
			<MenuItem onClick={() => onHash("users")}>
			Users
			</MenuItem>
			<MenuItem onClick={() => onHash("categories")}>
			Categories
			</MenuItem>
		</MenuList>
	);
};
