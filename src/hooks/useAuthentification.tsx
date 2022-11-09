import React, { useState } from "react";
import { api } from "../api/API";
import { useAppDispatch } from "./reduxTyped";
import { onCurrentUser } from "../redux/reducers/userReducer";
import { LoginErr } from "../types/IAPI";
import { onSetCookie } from "../tools/cookie";

export const useAuthentificaton = () => {
	const [loginError, setLoginError] = useState<null | LoginErr>(null);
	const [userError, setUserError] = useState<null | LoginErr>(null);
	const dispatch = useAppDispatch();

	const getUser = async (token: string) => {
		try{
			const res = await api.authentication.authentificate(token);
			onSetCookie(token);
			dispatch(onCurrentUser(res));
		} catch(err: any) {
			setUserError(err);
		}
	};

	const auth = async (email: string, password: string) => {
		try{
			const res = await api.authentication.login(email, password);
			if(res !== undefined && "access_token" in res) {
				await getUser(res["access_token"]);
			}
		} catch(err: any) {
			setLoginError(err);
		}
	};
		
	return { loginError, userError, auth, getUser };
};