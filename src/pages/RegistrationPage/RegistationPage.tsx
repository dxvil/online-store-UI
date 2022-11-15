import React from "react";
import { Registration } from "../../components/Forms/Registration";
import { AppMenu } from "../../components/Menu/AppMenu";

export const RegistrationPage = () => {
	return(
		<div className="page">
			<AppMenu />
			<Registration />
		</div>
	);
};