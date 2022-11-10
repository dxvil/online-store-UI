import React, { useState } from "react";
import { ProfileMenu } from "./ProfileMenu";
import { Settings } from "./Settings";
import { SettingsModal } from "../SettingsModal";
import { ICategory, IProduct } from "../../types/interfaces";
import { useAppSelector } from "../../hooks/reduxTyped";

export const Admin = () => {
	const [onCategoriesModalEdit, setOnCategoriesModalEdit] = useState<boolean>(false);
	const [onCategoriesModalCreate, setOnCategoriesModalCreate] = useState<boolean>(false);
	const [onProductsModalEdit, setOnProductsModalEdit] = useState<boolean>(false);
	const [onProductsModalCreate, setOnProductsModalCreate] = useState<boolean>(false);
	const [categoryToEdit, setCategoryToEdit] = useState<ICategory | null>(null);
	const [productToEdit, setProductToEdit] = useState<IProduct | null>(null);
	const categories = useAppSelector((state) => state.products.categories);
	const products = useAppSelector((state) => state.products.allProducts);
	return (
		<>
			<ProfileMenu />
			<div style={{width: "70%"}}>
				{/* <Settings 
					context="categories"
					modalEdit={onCategoriesModalEdit}
					onModalEdit={setOnCategoriesModalEdit}
					onModalCreate={setOnCategoriesModalCreate}
					setItemToEdit={setCategoryToEdit}
				/> */}
				<Settings<IProduct>
					context="products"
					list={products}
					modalEdit={onProductsModalEdit}
					onModalEdit={setOnProductsModalEdit}
					setItemToEdit={setProductToEdit}
					onModalCreate={setOnProductsModalCreate}
				/>
				{onProductsModalEdit && <SettingsModal 
					values={productToEdit}
					open={onProductsModalEdit}
					handleClose={setOnProductsModalEdit}
					mode="edit"
				/>}
				{onProductsModalCreate && <SettingsModal 
					open={onProductsModalCreate}
					handleClose={setOnProductsModalCreate}
					mode="create"
				/>}
				{onCategoriesModalEdit && <SettingsModal 
					values={categoryToEdit}
					open={onCategoriesModalEdit}
					handleClose={setOnCategoriesModalEdit}
					mode="edit"
				/>}
				{onCategoriesModalCreate && <SettingsModal 
					open={onCategoriesModalCreate}
					handleClose={setOnCategoriesModalCreate}
					mode="create"
				/>}
			</div>
		</>
	);
};
