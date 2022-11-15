import React,{ useEffect, useState } from "react";
import { FormGroup, FormControlLabel, Checkbox,  Box, Stack } from "@mui/material";
import { ICategory } from "../types/interfaces";
import { useAppSelector } from "../hooks/reduxTyped";
import { useDebounce } from "../hooks/useDebounce";

interface CategoriesComponent {
	setActiveCategory: (category: number) => void
}

export const Categories = ({setActiveCategory}: CategoriesComponent) => {
	const [category, setCategory] = useState<null | number>(null);
	const { categories } = useAppSelector((state) => state.categories);
	const debouncedCategory = useDebounce(category, 500);

	useEffect(() => {
		if(debouncedCategory) {
			setActiveCategory(debouncedCategory);
		} else {
			setActiveCategory(0);
		}
		
	}, [debouncedCategory]);

	return (
		<Box 
			sx={{ 
				borderBottom: 1, 
				borderColor: "divider",
				width: "60%",
			}}>
			<FormGroup>
				<Stack 
					direction="row" 
					spacing={5} 
					sx={{flexWrap: "wrap"}} 
					alignItems="center"
					justifyContent="center"
				>
					{categories && categories.map((categoryItem: ICategory) => {
						return(
							<FormControlLabel 
								onChange={() => {
									if(category !== categoryItem.id) {
										setCategory(categoryItem.id);
										return;
									}
									setCategory(null);
								}}
								checked={categoryItem.id === category}
								defaultChecked={categoryItem.id === category}
								labelPlacement="start"
								key={categoryItem.id}
								value={categoryItem.id}
								control={<Checkbox  />} 
								label={categoryItem.name} />
						);
					})}</Stack>
			</FormGroup>
		</Box>
	);
};
