import React from "react";
import {Link} from "react-router-dom";
import {Button} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const BackButton = ({link}: {link: string}) => {
	return (
		<Link to={link}>
			<Button variant="outlined">
				<ArrowBackIcon />
			</Button>
		</Link>
	);
};
