import { Alert, AlertTitle, Stack } from "@mui/material";
import React from "react";
import { AppMenu } from "../../components/Menu/AppMenu";
import notfound from "../../assets/images/404.png";

export const ErrorPage = () => {
	return (
		<Stack 
			className="page"
			sx={{ 
				width: "100%", 
				height: "100vh",
				overflow: "hidden",
				backgroundColor: "#788"
			}} 
			spacing={2} 
			justifyContent="center"
			alignItems="center">
			<AppMenu />
			<Alert severity="error" sx={{width: "50%"}}>
				<AlertTitle>
                    404 Page not Found
				</AlertTitle>
                This page do not exist
			</Alert>
			<img src={notfound} alt="404 Not Found image"
				style={{width: "33%"}}
			/>
		</Stack>
	);
};
