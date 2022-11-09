import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxTyped";
import { fetchListOfCategories } from "../../redux/reducers/productsReducer";
import { Stack, Button } from "@mui/material";
import { CategoryItem } from "./CategoryItem";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ICategory } from "../../types/interfaces";

type TCategoriesSettings ={
	onCategoriesModal: boolean,
	setOnCategoriesModal: (value: boolean) => void
	setCategoryToEdit: (category: ICategory) => void
};

export const CategoriesSettings = ({setOnCategoriesModal, setCategoryToEdit}: TCategoriesSettings) => {
	const dispatch = useAppDispatch();
	const categories = useAppSelector((state) => state.products.categories);
	const isUpdated = useAppSelector((state) => state.admin.isUpdated);

	useEffect(() => {
		dispatch(fetchListOfCategories());
	}, [isUpdated]);

	const onEdit = (item: ICategory): void => {
		setOnCategoriesModal(true);
		setCategoryToEdit(item);
	};

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
							<Button onClick={() => onEdit(category)}>
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
