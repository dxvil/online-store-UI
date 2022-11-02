import React from "react";
import { Box } from "@mui/material";
import Intro from "../../components/Menu/Intro/Intro";
import { AppMenu } from "../../components/Menu/AppMenu";
import "./header.css";

export const Header = () => {
	return (
		<Box className="header">
			<AppMenu />
			<Intro />
		</Box>
	);
};