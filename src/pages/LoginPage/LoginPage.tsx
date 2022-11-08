import React from "react";
import { Stack } from "@mui/material";
import { Login } from "../../components/Login";

export const LoginPage = () => {
	return (
		<Stack direction="column" 
			alignItems="center"
			spacing={5}
			sx={{width: "100%", height: "100vh"}}
			justifyContent="center">
			<Login />
		</Stack>
	);
};
