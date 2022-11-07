import React,{ useEffect, useState } from "react";
import { FormGroup, FormControlLabel, Checkbox,  Box, Stack } from "@mui/material";
import { ICategory } from "../types/interfaces";
import { useAppSelector, useAppDispatch } from "../hooks/reduxTyped";
import { fetchListOfCategories, onActiveCategoryChange } from "../redux/reducers/productsReducer";
import { useDebounce } from "../hooks/useDebounce";

export const Categories = () => {
	const dispatch = useAppDispatch();
	const [category, setCategory] = useState<null | number>(null);
	const categories = useAppSelector((state) => state.products.categories);
	const activeCategory = useAppSelector((state) => state.products.activeCategory);
	const debouncedCategory = useDebounce(category, 500);

	const onChange = (id: number) => {
		setCategory(activeCategory === id ? 0 : id);
	};

	useEffect(() => {
		dispatch(fetchListOfCategories());
	}, []);

	useEffect(() => {
		setCategory(activeCategory);
	}, []);

	useEffect(() => {
		dispatch(onActiveCategoryChange(debouncedCategory));
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
					{categories && categories.map((category: ICategory) => {
						return(
							<FormControlLabel 
								onChange={() => onChange(category.id)}
								checked={category.id === activeCategory}
								defaultChecked={category.id === activeCategory}
								labelPlacement="start"
								key={category.id}
								value={category.id}
								control={<Checkbox  />} 
								label={category.name} />
						);
					})}</Stack>
			</FormGroup>
		</Box>
	);
};
