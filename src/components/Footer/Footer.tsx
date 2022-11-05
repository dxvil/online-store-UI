import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Stack, Button, Typography } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import FacebookIcon from "@mui/icons-material/Facebook";
import {footerLinks} from "../../projectSetup";
import "./footer.css";

export const Footer = () => {
	return (
		<Stack className="footer" direction="row" justifyContent="space-around" alignItems="center">
			<Typography variant="h6">
                Cool Store
			</Typography>
			<Stack direction="row">
				<a href={footerLinks.twitter} 
					className="social-media-link">
					<TwitterIcon/>
				</a>
				<a href={footerLinks.instagram} 
					className="social-media-link">
					<InstagramIcon/>
				</a>
				<a href={footerLinks.pinterest} 
					className="social-media-link">
					<PinterestIcon/>
				</a>
				<a href={footerLinks.facebook} 
					className="social-media-link">
					<FacebookIcon/>
				</a>
			</Stack>
		</Stack>
		
	);
};
