import { useMemo } from "react";
import { IProduct } from "../types/interfaces";

export const useFilters = (list: IProduct[], title?: string) => {
	const findItem = (title: string) => {
		return list.filter((item) => item.title.toLowerCase().includes(title.toLowerCase()));
	};
	const foundItemsList: IProduct[] = useMemo(() => {
		return title ? findItem(title) : [];
	}, [title]);
    
	

	return { foundItemsList };
};