import { Box } from "@mui/material";
import React from "react";
import Intro from "../components/Menu/Intro";
import { AppMenu } from "../components/Menu/AppMenu";

export const Header = () => {
	return (
		<Box className="header">
			<AppMenu />
			<Intro />
		</Box>
	);
};