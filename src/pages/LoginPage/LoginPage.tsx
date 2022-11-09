import React from "react";
import { Stack } from "@mui/material";
import { Login } from "../../components/Login";
import { useAuthentificaton } from "../../hooks/useAuthentification";
import { ApiError } from "../../components/ApiError";

export const LoginPage = () => {
	const { userError } = useAuthentificaton();
	return (
		<Stack direction="column" 
			alignItems="center"
			spacing={5}
			sx={{width: "100%", height: "100vh"}}
			justifyContent="center">
			<Login />
			{userError &&
			<ApiError 
				message={userError.message} 
				statusCode={userError.statusCode} 
			/>
			}
		</Stack>
	);
};
