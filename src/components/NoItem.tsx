import React from "react";
import { BackButton } from "./BackButton";
import { Stack, Alert, AlertTitle } from "@mui/material";
import { IProductError } from "../types/IAPI";

interface INoItem extends IProductError {
    link: string
}

export const NoItem = ({link, statusCode, message, error}: INoItem) => {
	return (
		<Stack 
			alignItems="center"
			justifyContent="center"
			direction="row" 
			spacing={5} 
			sx={{margin: "5em 0"}}>
			<BackButton link={link} />
			<Alert severity="error" sx={{width: "30%"}}>
				<AlertTitle>{statusCode} {error}</AlertTitle>
				{message}
			</Alert>
		</Stack>
	);
};
