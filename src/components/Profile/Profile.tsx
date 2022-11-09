import React from "react";
import { Stack, Card, CardContent, Typography } from "@mui/material";
import { Admin } from "./Admin";
import { useAppSelector } from "../../hooks/reduxTyped";

export const Profile = () => {
	const {user} = useAppSelector((state) => state.user);
	
	return (
		<Stack direction="row" 
			sx={{width: "100%"}}
			justifyContent="space-between"
			spacing={20}>
			<Admin />
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
