import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxTyped";
import { fetchListOfCategories } from "../../redux/reducers/productsReducer";
import { Stack, Button } from "@mui/material";
import { CategoryItem } from "./CategoryItem";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const CategoriesSettings = () => {
	const dispatch = useAppDispatch();
	const categories = useAppSelector((state) => state.products.categories);

	useEffect(() => {
		dispatch(fetchListOfCategories());
	}, []);
	
	return (
		<Stack 
			sx={{flexWrap: "wrap", margin: "1em 0"}}
			justifyContent="center"
			direction="row">
			<Button sx={{
				width: "250px", 
				height: "250px", 
				margin: "1em 2em", 
				padding: "1em"}}>
				Create Category
			</Button>
			{categories.map((category) => {
				return (
					<Stack 
						direction="column"
						justifyContent="center"
						alignItems="center"
						sx={{
							flexWrap: "wrap"
						}}
						key={`${category.id}-category-settings`}>
						<Stack direction="row"
							justifyContent="center"
							alignItems="center">
							<Button>
								<EditIcon/>
							</Button>
							<Button>
								<DeleteIcon/>
							</Button>
						</Stack>
						<CategoryItem name={category.name} image={category.image} />
					</Stack>
				);
			})}
		</Stack>
	);
};
