import React, { useEffect, useState } from "react";
import { api } from "../api/API";

export const useAuthentificaton = (username: string, password: string) => {

	useEffect(() => {
		api.authentication.login(username, password).then((res) => {
			console.log(res, "res");
		});
	}, [username, password]);

};