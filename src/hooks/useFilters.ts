import { useMemo } from "react";
import { IProduct } from "../types/interfaces";

export const useFilters = (list: IProduct[], title?: string, activeCategory?: number) => {
	
	const findItem = (title: string, activeCategory?: number) => {
		if(activeCategory) {
			return list.filter((item) => item.category.id === activeCategory && item.title.toLowerCase().includes(title.toLowerCase()));
		}
		return list.filter((item) => item.title.toLowerCase().includes(title.toLowerCase()));
	};

	const foundItemsList: IProduct[] = useMemo(() => {
		return title ? findItem(title, activeCategory) : [];
	}, [title, activeCategory]);

	return { foundItemsList };
};