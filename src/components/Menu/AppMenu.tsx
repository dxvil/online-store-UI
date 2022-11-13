import React from "react";
import { Typography, Badge, Button, Tooltip } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { NavLink, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxTyped";
import LogoutIcon from "@mui/icons-material/Logout";
import styles from "../../assets/styles/Menu.module.css";
import { useAuthentificaton } from "../../hooks/useAuthentification";

export const AppMenu = () => {
	const location = useLocation();
	const { quintity } = useAppSelector((state) => state.cart);
	const { isLogin } = useAppSelector((state) => state.user);
	const { logout } = useAuthentificaton();

	return (
		<ul 
			className={styles["app-menu-list"]}>
			{location.pathname !== "/" &&
			<li 
				className={styles["app-menu-list-item"]}>
				<NavLink to="/">
					<Typography sx={{ minWidth: 100 }}>Home</Typography>
				</NavLink>
			</li>
			}
			<li 
				className={styles["app-menu-list-item"]}>
				<NavLink to="/products">
					<Typography sx={{ minWidth: 100 }}>Products</Typography>
				</NavLink>
			</li>
			<li 
				className={styles["app-menu-list-item"]}>
				<NavLink to="/profile">
					<Typography sx={{ minWidth: 100 }}>Profile</Typography>
				</NavLink>
			</li>
			<li 
				className={styles["app-menu-list-item"]}>
				<NavLink to="/cart" 
					className="cart-list-item">
					<Badge 
						color="primary" 
						badgeContent={quintity}>
						<Tooltip title="Cart">
							<ShoppingCartIcon />
						</Tooltip>
					</Badge>
				</NavLink>
			</li>
			{isLogin && 
			<li 
				className={styles["app-menu-list-item"]}>
				<Button onClick={() => logout()} className="cart-list-item">
					<Tooltip title="Logout">
						<LogoutIcon />
					</Tooltip>
				</Button>
			</li>
			}
		</ul>
		
	);
};
