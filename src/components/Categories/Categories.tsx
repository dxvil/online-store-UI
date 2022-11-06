import React,{ useState, useEffect } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { api } from "../../api/API";
import { ICategory } from "../../types/interfaces";
import { TCategories } from "../../types/IAPI";
interface ICategoryC {
    setActiveCategory: (id: number) => void
    activeCategory: number | null
}
export const Categories = ({setActiveCategory, activeCategory}: ICategoryC) => {
	const [categories, setCategories] = useState<TCategories | undefined>([]);


	useEffect(() => {
		api.categories.get().then((res: TCategories | undefined) => {
			if(res !== undefined) {
				console.log(res);
                
				setCategories(res);
			}
		});
	}, []);

	return (
		<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
			<Tabs value={activeCategory ?? undefined} onChange={(e, id) => setActiveCategory(id)}>
				{categories && categories.map((category: ICategory) => {
					return(
						<Tab value={category.id} key={category.id} label={category.name} />
					);
				})}
			</Tabs>
		</Box>
	);
};
