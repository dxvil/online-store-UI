import React from "react";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

export const Loader = () => {
	return (
		<Box sx={{ display: "flex" }}>
			<CircularProgress />
		</Box>
	);
};
