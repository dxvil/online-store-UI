import React from "react";
import {Link} from "react-router-dom";
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
				<Link to={footerLinks.twitter}>
					<Button>
						<TwitterIcon/>
					</Button>
				</Link>
				<Link to={footerLinks.instagram}>
					<Button>
						<InstagramIcon/>
					</Button>
				</Link>
				<Link to={footerLinks.pinterest}>
					<Button>
						<PinterestIcon/>
					</Button>
				</Link>
				<Link to={footerLinks.facebook}>
					<Button>
						<FacebookIcon/>
					</Button>
				</Link>

			</Stack>
		</Stack>
		
	);
};
