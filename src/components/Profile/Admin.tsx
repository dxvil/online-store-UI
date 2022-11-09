import React, { useState } from "react";
import { ProfileMenu } from "./ProfileMenu";
import { CategoriesSettings } from "./CategoriesSettings";
import { EditCategory } from "../EditCategory";
import { ICategory } from "../../types/interfaces";

export const Admin = () => {
	const [onCategoriesModalEdit, setOnCategoriesModalEdit] = useState<boolean>(false);
	const [onCategoriesModalCreate, setOnCategoriesModalCreate] = useState<boolean>(false);
	const [categoryToEdit, setCategoryToEdit] = useState<ICategory | null>(null);
	
	return (
		<>
			<ProfileMenu />
			<div style={{width: "70%"}}>
				<CategoriesSettings 
					onCategoriesModalEdit={onCategoriesModalEdit}
					setOnCategoriesModalEdit={setOnCategoriesModalEdit}
					setOnCategoriesModalCreate={setOnCategoriesModalCreate}
					setCategoryToEdit={setCategoryToEdit}
				/>
				{onCategoriesModalEdit && <EditCategory 
					values={categoryToEdit}
					open={onCategoriesModalEdit}
					handleClose={setOnCategoriesModalEdit}
					mode="edit"
				/>}
				{onCategoriesModalCreate && <EditCategory 
					open={onCategoriesModalCreate}
					handleClose={setOnCategoriesModalCreate}
					mode="create"
				/>}
			</div>
		</>
	);
};
