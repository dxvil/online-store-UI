import React, { useState } from "react";
import { ProfileMenu } from "./ProfileMenu";
import { CategoriesSettings } from "./CategoriesSettings";
import { EditCategory } from "../EditCategory";
import { ICategory } from "../../types/interfaces";

export const Admin = () => {
	const [onCategoriesModal, setOnCategoriesModal] = useState<boolean>(false);
	const [categoryToEdit, setCategoryToEdit] = useState<ICategory | null>(null);
	
	return (
		<>
			<ProfileMenu />
			<div style={{width: "70%"}}>
				<CategoriesSettings 
					onCategoriesModal={onCategoriesModal}
					setOnCategoriesModal={setOnCategoriesModal}
					setCategoryToEdit={setCategoryToEdit}
				/>
				{onCategoriesModal && <EditCategory 
					values={categoryToEdit}
					open={onCategoriesModal}
					handleClose={setOnCategoriesModal}
					mode="edit"
				/>}
			</div>
		</>
	);
};
