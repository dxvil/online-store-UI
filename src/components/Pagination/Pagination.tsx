import React, { useEffect, useState } from "react";
import {Pagination} from "@mui/material";
interface IPagination {
	amountOfItems: number
	setPageOfItems?: (page: number) => void
}
export const AppPagination = ({amountOfItems, setPageOfItems} : IPagination) => {
	const [page, setPage] = useState<number>(0);

	const onPage = (page: number): void => {
		setPage(page);
	};
    
	useEffect(() => {
		if(setPageOfItems !== undefined) {
			setPageOfItems(page);
		}
	}, [page]);

	return (
		<Pagination 
			sx={{margin: "5em 0 3em 0"}}
			variant="outlined" 
			color="primary"
			count={amountOfItems}
			onChange={(e: React.BaseSyntheticEvent, page: number) => onPage(page)}
			page={page}
			boundaryCount={10}
		/>
	);
};
