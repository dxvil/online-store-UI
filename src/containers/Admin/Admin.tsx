import React, { useState } from "react";
import { ProfileMenu } from "../../components/Profile/ProfileMenunts/Profile/ProfileMenu";
import { Settings } from "../../components/Profile/Settingsonents/Profile//Settings";
import { SettingsModal } from "../../components/SettingsModal";
import { ICategory, IProduct, AdminContext } from "../../types/interfaces";
import { useAppSelector } from "../../hooks/reduxTyped";

export const Admin = () => {
	const [onCategoriesModalEdit, setOnCategoriesModalEdit] = useState<boolean>(false);
	const [onCategoriesModalCreate, setOnCategoriesModalCreate] = useState<boolean>(false);
	const [onProductsModalEdit, setOnProductsModalEdit] = useState<boolean>(false);
	const [onProductsModalCreate, setOnProductsModalCreate] = useState<boolean>(false);
	const [categoryToEdit, setCategoryToEdit] = useState<ICategory | undefined>(undefined);
	const [productToEdit, setProductToEdit] = useState<IProduct | undefined>(undefined);
	const categories = useAppSelector((state) => state.products.categories);
	const products = useAppSelector((state) => state.products.allProducts);
	const [context, setContext] = useState<AdminContext>("categories");

	return (
		<>
			<ProfileMenu setContext={setContext} />
			<div style={{width: "70%"}}>
				{context === "categories" && <Settings<ICategory>
					context="categories"
					list={categories}
					modalEdit={onCategoriesModalEdit}
					onModalEdit={setOnCategoriesModalEdit}
					onModalCreate={setOnCategoriesModalCreate}
					setItemToEdit={setCategoryToEdit}
				/>}
				{context === "products" && <Settings<IProduct>
					context="products"
					list={products}
					modalEdit={onProductsModalEdit}
					onModalEdit={setOnProductsModalEdit}
					setItemToEdit={setProductToEdit}
					onModalCreate={setOnProductsModalCreate}
				/>}
				{onProductsModalEdit && <SettingsModal
					context="products"
					defaultProductValues={productToEdit}
					open={onProductsModalEdit}
					handleClose={setOnProductsModalEdit}
					mode="edit"
				/>}
				{onProductsModalCreate && <SettingsModal 
					context="products"
					open={onProductsModalCreate}
					handleClose={setOnProductsModalCreate}
					mode="create"
				/>}
				{onCategoriesModalEdit && <SettingsModal 
					context="categories"
					defaultCategoriesValues={categoryToEdit}
					open={onCategoriesModalEdit}
					handleClose={setOnCategoriesModalEdit}
					mode="edit"
				/>}
				{onCategoriesModalCreate && <SettingsModal 
					context="categories"
					open={onCategoriesModalCreate}
					handleClose={setOnCategoriesModalCreate}
					mode="create"
				/>}
			</div>
		</>
	);
};
