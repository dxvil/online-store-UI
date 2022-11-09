import React, { useState, useEffect } from "react";
import {Modal, Stack, Typography, Alert, TextField, Button} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/reduxTyped";
import { onCategoryUpdate, onCategoryCreate } from "../redux/reducers/adminReducer";
import { EditModal } from "../types/interfaces";

export const EditCategory = ({open, handleClose, mode, values}: EditModal) => {
	const [name, setName] = useState<string>();
	const [image, setImage]= useState<string>();
	const dispatch = useAppDispatch();
	
	useEffect(() => {
		if(values) {
			setName(values.name);
			setImage(values.image);
		}
	}, [values]);

	const onEdit = () => {
		if(values) {
			dispatch(onCategoryUpdate({
				id: values.id,
				body: {
					id: values.id,
					name,
					image
				}
			}));
			handleClose(false);
		}
	};

	const onCreate = () => {
		if(name && image) {
			dispatch(onCategoryCreate({
				name,
				image
			}));
			handleClose(false);
		}
	};

	return (
		<Modal
			sx={{
				width: "100%", 
				height: "100vh", 
				display: "flex", 
				justifyContent: "center",
				alignItems: "center"
			}}
			open={open}
			onClose={() => handleClose(false)}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Stack 
				direction="column" 
				spacing={5}
				alignItems="center" 
				sx={{backgroundColor: "#fff", width: "50%", padding: "3em"}}
				justifyContent="center">
				<Typography id="modal-modal-title" variant="h6" component="h2">
                    Edit Category
				</Typography>
				<TextField 
					sx={{width: "60%"}}
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					id="outlined-basic" 
					label="name" 
					variant="outlined" />
				<TextField 
					sx={{width: "60%"}}
					type="url"
					value={image}
					onChange={(e) => setImage(e.target.value)}
					id="outlined-basic" 
					label="image" 
					variant="outlined" />
				<Button 
					onClick={() => {
						if(mode === "edit") {
							onEdit();
							return;
						}
						onCreate();
						return;
					}}
					variant="contained" 
					sx={{width: "10em"}}>
					{mode === "edit" ? "Edit" : "Create"}
				</Button>
			</Stack>
		</Modal>
	);
};
