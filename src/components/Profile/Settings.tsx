import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxTyped";
import { fetchAllProducts } from "../../redux/reducers/productsReducer";
import { Stack, Button } from "@mui/material";
import { Item } from "./Item";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { TSettings } from "../../types/interfaces";
import { 
	cancelUpdatedCategoryState, 
	cancelCreatedCategoryState, 
	cancelDeletedCategoryState, 
	cancelCreatedProductState,
	cancelDeletedProductState, 
	cancelUpdatedProductState,
	onCategoryDelete } from "../../redux/reducers/adminReducer";
import {uuid} from "../../tools/uuid";
import { fetchListOfCategories } from "../../redux/reducers/categoriesReducer";

export function Settings<T>({
	list,
	context, 
	onModalEdit, 
	onModalCreate, 
	setItemToEdit
}: TSettings<T>) {
	const dispatch = useAppDispatch();
	const isUpdated = context === "categories" ?
		useAppSelector((state) => state.admin.isUpdatedCategory)
		: useAppSelector((state) => state.admin.isUpdatedProduct);
	const isDeleted = context === "categories" ?
		useAppSelector((state) => state.admin.isDeletedCategory) :
		useAppSelector((state) => state.admin.isDeletedProduct);
	const isCreated = context === "categories" ?
		useAppSelector((state) => state.admin.isCreatedCategory)
		: useAppSelector((state) => state.admin.isCreatedProduct);

	const onCategoriesContext = () => {
		if(context === "categories") {
			dispatch(fetchListOfCategories());
			dispatch(cancelUpdatedCategoryState());
			dispatch(cancelDeletedCategoryState());
			dispatch(cancelCreatedCategoryState());
		}
	};

	const onProductsContext = () => {
		if(context === "products") {
			dispatch(fetchAllProducts({maxElements: "5", offset: "0"}));
			dispatch(cancelCreatedProductState());
			dispatch(cancelDeletedProductState()); 
			dispatch(cancelUpdatedProductState());
		}
	};

	useEffect(() => {
		onProductsContext();
	}, []);

	useEffect(() => {
		if(context === "products") {
			onProductsContext();
		} else {
			onCategoriesContext();
		}
	}, [isUpdated, isDeleted, isCreated]);

	const onEdit = (item: T) => {
		onModalEdit(true);
		onModalCreate(false);
		setItemToEdit(item);
	};

	const onDelete = (id: number) => {
		if(context === "categories") {
			return onDeleteCatgories(id);
		}
	};

	const onDeleteCatgories = (id: number): void => {
		dispatch(onCategoryDelete(id));
	};

	const onCreate = () => {
		onModalEdit(false);
		onModalCreate(true);
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
			{list.map((item: T) => {
				return (
					<Stack 
						direction="column"
						justifyContent="center"
						alignItems="center"
						sx={{
							flexWrap: "wrap"
						}}
						key={uuid()}>
						<Stack direction="row"
							justifyContent="center"
							alignItems="center">
							<Button onClick={() => onEdit(item)}>
								<EditIcon/>
							</Button>
							<Button onClick={() => {
								if(item && "id" in item) {
									onDelete(item["id"]);
								}
							}}>
								<DeleteIcon/>
							</Button>
						</Stack>
						<Item<T> item={item} />
					</Stack>
				);
			})}
		</Stack>
	);
}
