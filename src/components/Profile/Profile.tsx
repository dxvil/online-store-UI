import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Card, CardContent, Alert, Typography } from "@mui/material";
import { Admin } from "../../containers/Admin/Admin";
import { useAppSelector } from "../../hooks/reduxTyped";

export const Profile = () => {
	const { user, isLogin } = useAppSelector((state) => state.user);
	const navigate = useNavigate();
	const customerStyles = user && user?.role === "customer" ? {
		alignItems: "center",
		justifyContent: "center"
	} : {};

	useEffect(() => {
		if(isLogin === false) {
			navigate("/login");
		}
	}, [isLogin]);

	return (
		<Stack direction="row" 
			sx={{width: "100%", margin: "5em 0 0 0"}}
			spacing={20}
			justifyContent="space-between"
			style={{...customerStyles}}>
			{user && user?.role === "admin" && <Admin />}
			{user && user?.role === "customer" &&
			<Alert severity="info" sx={{height: "3em"}}>
				Dear customer, here it will be your list of purchases later on.
			</Alert>
			}
			<Card sx={{ 
				maxWidth: "20%", 
				padding: "2em", 
				textAlign: "center",
				width: "20%"
			}}>
				<Typography gutterBottom variant="h2" component="div">
					{user?.name}
				</Typography>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{user?.role}
					</Typography>
				</CardContent>
			</Card>
		</Stack>
	);
};
