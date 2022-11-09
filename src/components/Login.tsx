import React, { useState, useEffect } from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
import { ApiError } from "./ApiError";
import { useAuthentificaton } from "../hooks/useAuthentification";
import { useAppSelector } from "../hooks/reduxTyped";
import { useNavigate } from "react-router-dom";

export const Login = () => {
	const [login, setLogin] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const { loginError, auth } = useAuthentificaton();
	const isLogin = useAppSelector((state) => state.user.isLogin);
	const navigate = useNavigate();

	const onSubmit = (e: React.BaseSyntheticEvent) => {
		e.preventDefault();
		auth(login, password);
	};


	useEffect(() => {
		if(isLogin) {
			navigate("/profile");
		}
	}, [isLogin]);

	return (
		<Box
			component="form"
			sx={{
				"& .MuiTextField-root": { m: 1, width: "25ch" },
				textAlign: "center"
			}}
			autoComplete="off"
		>
			<Typography variant="h6">
                Login
			</Typography>
			<div>
				<TextField
					required
					id="outlined-name-required"
					label="Name"
					value={login}
					onChange={(e) => setLogin(e.target.value)}
				/>
			</div>
			<div>
				<TextField
					id="outlined-password-input"
					label="Password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			<Button
				onClick={onSubmit}
				type="submit">
                Login
			</Button>

			{loginError && <ApiError 
				message={loginError.message} 
				statusCode={loginError.statusCode}
			/>}
		</Box>
	);
};
