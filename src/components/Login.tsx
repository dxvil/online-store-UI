import React, { useState } from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
import { useAuthentificaton } from "../hooks/useAuthentification";

export const Login = () => {
	const [login, setLogin] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const { err, auth } = useAuthentificaton();

	const onSubmit = (e: React.BaseSyntheticEvent) => {
		e.preventDefault();
		auth(login, password);
	};

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
			{err && <p style={{margin: "5em 0", fontSize: "2em"}}>{err.statusCode} {err.message}</p>}
		</Box>
	);
};
