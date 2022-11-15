import React, { useEffect } from "react";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registrationSchema } from "./schemas";
import { INewUser } from "../../types/IAPI";
import { useAuthentificaton } from "../../hooks/useAuthentification";
import { useAppSelector } from "../../hooks/reduxTyped";
import { Loader } from "../Loader";
import { useNavigate } from "react-router-dom";

export const Registration = () => {
	const { isCreatingNewUser, newUser } = useAppSelector((state) => state.user);
	const navigate = useNavigate();
	const { handleSubmit, control, formState: { errors } } = useForm({
		defaultValues: {
			name: "",
			password: "",
			email: "",
			avatar: ""
		},
		resolver: yupResolver(registrationSchema)
	});

	const { registration, 
		isAvailableEmailError, 
		setIsAvailableEmailError } = useAuthentificaton();
	

	const onSubmit = (data: INewUser) => {
		registration({email: data?.email}, data);
	};

	useEffect(() => {
		if(newUser) {
			navigate("/login");
		}
	}, [newUser]);
	

	return(
		<Box
			component="form"
			onChange={() => !isAvailableEmailError && setIsAvailableEmailError(true)}
			onSubmit={handleSubmit(onSubmit)}
			sx={{
				"& .MuiTextField-root": { m: 1, width: "25ch" },
				textAlign: "center",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				padding: "5em"
			}}
			autoComplete="off"
		>
			<Typography variant="h6">
                Registration
			</Typography>
			<Controller
				name="name"
				control={control}
				aria-invalid={errors.name ? "true" : "false"} 
				rules={{ required: true }}
				render={({ field }) => (
					<TextField 
						label="Name" 
						type="text"
						error={errors.name?.message ? true : false}
						helperText={errors.name?.message}
						inputProps={{
							autoComplete: "off"
						}}
						variant="standard" 
						{...field}
					/>)
				}
			/>
			<Controller
				control={control}
				aria-invalid={errors.email ? "true" : "false"} 
				name="email"
				rules={{ required: true }}
				render={({ field }) => (
					<TextField 
						label="Email" 
						type="email"
						error={errors.email?.message ? true : false}
						helperText={errors.email?.message}
						variant="standard" 
						inputProps={{
							autoComplete: "off"
						}}
						{...field}
					/>)
				}
			/>
			<Controller
				control={control}
				aria-invalid={errors.password ? "true" : "false"} 
				name="password"
				rules={{ required: true }}
				render={({ field }) => (
					<TextField 
						label="Password" 
						type="password"
						error={errors.password?.message ? true : false}
						helperText={errors.password?.message}
						variant="standard" 
						inputProps={{
							autoComplete: "off"
						}}
						{...field}
					/>)
				}
			/>
			<Controller
				control={control}
				aria-invalid={errors.avatar ? "true" : "false"} 
				name="avatar"
				rules={{ required: true }}
				render={({ field }) => (
					<TextField 
						label="Avatar" 
						type="url"
						error={errors.avatar?.message ? true : false}
						helperText={errors.avatar?.message}
						variant="standard" 
						inputProps={{
							autoComplete: "off"
						}}
						{...field}
					/>)
				}
			/>
			<Button 
				variant="contained"
				type="submit" 
				sx={{margin: "1em 0 0 0"}}
			>
                Create an account
			</Button>
			{!isAvailableEmailError ? 
				<Alert severity="error" sx={{margin: "1.5em 0"}}>
					This email is already in use.
				</Alert> 
				: null
			}
			{isCreatingNewUser && <Loader />}
		</Box>
	);
};