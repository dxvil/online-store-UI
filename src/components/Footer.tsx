import React from "react";
import { Stack, Typography } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import FacebookIcon from "@mui/icons-material/Facebook";
import {footerLinks} from "../projectSetup";
import styles from "../assets/styles/Footer.module.css";

export const Footer = () => {
	return (
		<Stack 
			className={styles.footer} 
			direction="row" 
			justifyContent="space-around" 
			alignItems="center">
			<Typography variant="h6">
                Cool Store
			</Typography>
			<Stack direction="row">
				<a href={footerLinks.twitter} 
					className={styles["social-media-link"]}>
					<TwitterIcon/>
				</a>
				<a href={footerLinks.instagram} 
					className={styles["social-media-link"]}>
					<InstagramIcon/>
				</a>
				<a href={footerLinks.pinterest} 
					className={styles["social-media-link"]}>
					<PinterestIcon/>
				</a>
				<a href={footerLinks.facebook} 
					className={styles["social-media-link"]}>
					<FacebookIcon/>
				</a>
			</Stack>
		</Stack>
		
	);
};
