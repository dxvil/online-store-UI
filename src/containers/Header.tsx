import { Box } from "@mui/material";
import React from "react";
import Intro from "../components/Menu/Intro";
import Menu from "../components/Menu/Menu";

const Header = () => {
	return (
		<Box className="header">
			<Menu />
			<Intro />
		</Box>
	);
};

export default Header;