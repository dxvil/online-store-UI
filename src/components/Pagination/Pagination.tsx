import React, { useEffect, useState } from "react";
import {Pagination} from "@mui/material";
interface IPagination {
	amountOfItems: number
	pageSize: number
	setPageOfItems?: (page: number) => void
}
export const AppPagination = ({amountOfItems, setPageOfItems} : IPagination) => {
	const [page, setPage] = useState<number>(0);

	const onPage = (page: number): void => {
		setPage(page);
	};

	useEffect(() => {
		if(setPageOfItems !== undefined) {
			if (page === 1) {
				setPageOfItems(0);
			} else if(page > 0) {
				setPageOfItems(page - 1);
			}
			
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
			defaultPage={page}
			boundaryCount={10}
		/>
	);
};
