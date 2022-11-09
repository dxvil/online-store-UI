import React from "react";
import { ProfileMenu } from "./ProfileMenu";
import { CategoriesSettings } from "./CategoriesSettings";

export const Admin = () => {
	return (
		<>
			<ProfileMenu />
			<div style={{width: "70%"}}>
				<CategoriesSettings />
			</div>
		</>
	);
};
