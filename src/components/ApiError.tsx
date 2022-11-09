import React from "react";
import { Alert } from "@mui/material";

export const ApiError = ({statusCode, message}: {message: string, statusCode: number}) => {
	return (
		<Alert severity="error" 
			style={{ 
				margin: "2em 0",
				display: "flex",
				justifyContent: "center",
				alignItems: "center"
			}}>
			{statusCode} {message}
		</Alert>
	);
};
