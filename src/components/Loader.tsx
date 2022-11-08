import React from "react";
import { Stack } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

export const Loader = () => {
	return (
		<Stack 
			direction="column"
			justifyContent="center"
			alignItems="center"
			sx={{
				width: "100%", 
				height: "100vh"
			}}
		>
			<CircularProgress />
		</Stack>
	);
};
