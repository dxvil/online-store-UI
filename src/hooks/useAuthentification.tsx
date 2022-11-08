import React, { useState } from "react";
import { api } from "../api/API";
type Login = {
	login: string,
	password: string
}
type LoginErr = {
	message: string,
	statusCode: number
}
export const useAuthentificaton = () => {
	const [user, setUser] = useState<Login>();
	const [err, setErr] = useState<null | LoginErr>(null);
	const auth = (username: string, password: string) => {
		api.authentication.login(username, password).then((res: any) => {
			if(res.statusCode === 401) {
				setErr(res);
				return;
			}
			setUser(res);
		});
	};
	
	return { user, err, auth };
};