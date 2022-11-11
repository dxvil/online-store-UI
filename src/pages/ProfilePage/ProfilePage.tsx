import React from "react";
import { Profile } from "../../components/Profile/Profile";
import { AppMenu } from "../../components/Menu/AppMenu";

export const ProfilePage = () => {
	return (
		<div className="page">
			<AppMenu />
			<Profile />
		</div>
	);
};
