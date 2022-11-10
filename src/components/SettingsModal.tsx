import React, { useState, useEffect } from "react";
import {Modal, Stack, Typography, Button} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/reduxTyped";
import { onCategoryUpdate, onCategoryCreate, onProductUpdate, onProductCreate } from "../redux/reducers/adminReducer";
import { EditModal, ICategory, INewCategory, IProduct, INewProduct } from "../types/interfaces";
import { CategoriesForm } from "./Profile/CategoriesForm";
import { ProductsForm } from "./Profile/ProductsForm";
import { ICategoriesForm } from "../types/interfaces";

export const SettingsModal = ({open, handleClose, mode, context, defaultCategoriesValues, defaultProductValues}: EditModal) => {
	const dispatch = useAppDispatch();
	const title = mode === "edit" ? "Edit" : "Create";
	const contextTitle = context === "products" ? "product" : "category";
	const [categoriesValues, setCategoriesValues] = useState<INewCategory | undefined>();
	const [productsValues, setProductsValues] = useState<Partial<IProduct> | INewProduct>({});

	const onEdit = () => {
		if(context === "categories" && categoriesValues && defaultCategoriesValues && "id" in defaultCategoriesValues) {
			dispatch(onCategoryUpdate({
				id: defaultCategoriesValues["id"],
				body: categoriesValues
			}));
			handleClose(false);
			return;
		}

		if(context === "products" && defaultProductValues && "id" in defaultProductValues) {
			dispatch(onProductUpdate({
				id: defaultProductValues["id"],
				product: productsValues
			}));
			handleClose(false);
			return;
		}

	};

	const onCreate = () => {
		if(context === "categories" && categoriesValues) {
			dispatch(onCategoryCreate(categoriesValues));
			handleClose(false);
			return;
		}
		if(context === "products" && productsValues && "categoryId" in productsValues) {
			dispatch(onProductCreate(productsValues));
			handleClose(false);
			return;
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
					{title} {contextTitle}
				</Typography>
				{context === "categories" && <CategoriesForm<ICategoriesForm<INewCategory | undefined>>
					values={defaultCategoriesValues} onChange={setCategoriesValues}
				/>}
				{context === "products" && <ProductsForm 
					values={defaultProductValues} 
					onChange={setProductsValues}
				/>}
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
					{title}
				</Button>
			</Stack>
		</Modal>
	);
};
