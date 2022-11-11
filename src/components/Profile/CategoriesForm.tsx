import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { ICategoriesForm } from "../../types/interfaces";

export function CategoriesForm ({values, onChange}: ICategoriesForm) {
	const [name, setName] = useState<string>();
	const [image, setImage]= useState<string>();

	const setupValues = () => {
		if(values && "name" in values) setName(values.name);
		if(values && "image" in values) setImage(values.image);
	};

	useEffect(() => {
		if(values) {
			setupValues();
		}
	}, [values]);

	useEffect(() => {
		if(name && image) {
			onChange({
				name,
				image
			});
		}
	}, [name, image]);

	return (
		<>
			<TextField sx={{width: "60%"}}
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
		</>
	);
}
