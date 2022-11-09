import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxTyped";
import { fetchListOfCategories } from "../../redux/reducers/productsReducer";
import { Stack, Button } from "@mui/material";
import { CategoryItem } from "./CategoryItem";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ICategory, TCategoriesSettings } from "../../types/interfaces";
import { cancelUpdatedCategoryState, cancelCreatedCategoryState, cancelDeletedCategoryState, onCategoryDelete } from "../../redux/reducers/adminReducer";

export const CategoriesSettings = ({setOnCategoriesModalEdit, setOnCategoriesModalCreate, setCategoryToEdit}: TCategoriesSettings) => {
	const dispatch = useAppDispatch();
	const categories = useAppSelector((state) => state.products.categories);
	const isUpdated = useAppSelector((state) => state.admin.isUpdatedCategory);
	const isDeleted = useAppSelector((state) => state.admin.isDeletedCategory);
	const isCreated = useAppSelector((state) => state.admin.isCreatedCategory);
	useEffect(() => {
		dispatch(fetchListOfCategories());
		dispatch(cancelUpdatedCategoryState());
		dispatch(cancelDeletedCategoryState());
		dispatch(cancelCreatedCategoryState());
	}, [isUpdated, isDeleted, isCreated]);

	const onEdit = (item: ICategory): void => {
		setOnCategoriesModalEdit(true);
		setOnCategoriesModalCreate(false);
		setCategoryToEdit(item);
	};

	const onDelete = (id: number): void => {
		dispatch(onCategoryDelete(id));
	};

	const onCreate = () => {
		setOnCategoriesModalEdit(false);
		setOnCategoriesModalCreate(true);
	};

	return (
		<Stack 
			sx={{flexWrap: "wrap", margin: "1em 0"}}
			justifyContent="center"
			direction="row">
			<Button 
				onClick={() => onCreate()}
				sx={{
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
							<Button onClick={() => onDelete(category.id)}>
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
