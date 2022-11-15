import React, { useState } from "react";
import { api } from "../api/api";
import { useAppDispatch } from "./reduxTyped";
import { onCurrentUser, onLogout, registrationNewUser } from "../redux/reducers/userReducer";
import { IEmail, INewUser, LoginErr } from "../types/IAPI";
import { onSetCookie } from "../tools/cookie";
import { cookieName, onDeleteCookie } from "../tools/cookie";

export const useAuthentificaton = () => {
	const [loginError, setLoginError] = useState<null | LoginErr>(null);
	const [userError, setUserError] = useState<null | LoginErr>(null);
	const [isAvailableEmailError, setIsAvailableEmailError] = useState<boolean>(true);
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

	const logout = () => {
		onDeleteCookie(cookieName);
		dispatch(onLogout());
	};

	const checkEmail = async (email: IEmail) => {
		try	{
			return await api.authentication.checkEmailAvailability(email);
		} catch(err) {
			return err;
		}
	};
	const registration = (email: IEmail, data: INewUser) => {
		return Promise.all([
			checkEmail(email),
			dispatch(registrationNewUser(data))
		]).then((res: any) => {
			if(res[0] && "isAvailable" in res[0]) {
				setIsAvailableEmailError(res[0]?.isAvailable);
			}
		});
	};
		
	return { 
		loginError, 
		userError, 
		auth, 
		registration, 
		isAvailableEmailError,
		setIsAvailableEmailError,
		getUser, 
		logout };
};
