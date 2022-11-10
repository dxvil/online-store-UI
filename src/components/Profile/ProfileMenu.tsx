import React from "react";
import { MenuList, MenuItem } from "@mui/material";
import { IProfileMenu } from "../../types/interfaces";


export const ProfileMenu = ({setContext}: ProfileMenu) => {
	const onChange = (context: string) => {
		setContext(context);
	};
	return (
		<MenuList 
			sx={{fontSize: "2em", width: "10%"}}
			id="composition-menu"
			aria-labelledby="composition-button">
			<MenuItem onClick={() => onChange("products")}>
			Products
			</MenuItem>
			<MenuItem onClick={() => onChange("categories")}>
			Categories
			</MenuItem>
		</MenuList>
	);
};
