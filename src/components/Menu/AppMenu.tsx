import React from "react";
import { Typography, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { NavLink, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxTyped";

import "./menu.css";

export const AppMenu = () => {
	const location = useLocation();
	const {quintity} = useAppSelector((state) => state.cart);

	return (
		<ul className="app-menu-list">
			{location.pathname !== "/" &&
			<li className="app-menu-list-item">
				<NavLink to="/">
					<Typography sx={{ minWidth: 100 }}>Home</Typography>
				</NavLink>
			</li>
			}
			<li className="app-menu-list-item">
				<NavLink to="/products">
					<Typography sx={{ minWidth: 100 }}>Products</Typography>
				</NavLink>
			</li>
			<li className="app-menu-list-item">
				<NavLink to="/profile">
					<Typography sx={{ minWidth: 100 }}>Profile</Typography>
				</NavLink>
			</li>
			<li className="app-menu-list-item">
				<NavLink to="/cart" className="cart-list-item">
					<Badge 
						color="primary" 
						badgeContent={quintity}>
						<ShoppingCartIcon />
					</Badge>
				</NavLink>
				<div className="cart-list-counter"></div>
			</li>
		</ul>
		
	);
};
