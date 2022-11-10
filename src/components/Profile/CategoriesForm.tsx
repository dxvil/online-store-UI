import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { ICategoriesForm, INewCategory } from "../../types/interfaces";

export function CategoriesForm<T extends ICategoriesForm<INewCategory | undefined>>({values, onChange}: T) {
	const [name, setName] = useState<string>();
	const [image, setImage]= useState<string>();

	useEffect(() => {
		if(values) {
			if("name" in values) setName(values.name);
			if("image" in values) setImage(values.image);
		}
	}, [values]);

	useEffect(() => {
		onChange({
			name,
			image
		});
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
