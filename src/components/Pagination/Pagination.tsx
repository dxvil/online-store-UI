import React from "react";
import {Pagination} from "@mui/material";
interface IPagination {
	amountOfItems: number | null
	pageOfItems: number
	pageSize: number
	setPageOfItems?: (page: number) => void
}
export const AppPagination = ({amountOfItems, pageOfItems, setPageOfItems} : IPagination) => {
	const onPage = (page: number): void => {
		if(setPageOfItems) {
			setPageOfItems(page);
		}
	};

	if(amountOfItems) {
		return (
			<Pagination 
				sx={{
					margin: "5em 0 3em 0", 
					width: "100%", 
					display: "flex", 
					justifyContent: "center"
				}}
				variant="outlined" 
				color="primary"
				count={amountOfItems !== null ? amountOfItems : 1}
				onChange={(e: React.BaseSyntheticEvent, page: number) => onPage(page)}
				page={pageOfItems}
				defaultPage={pageOfItems}
				boundaryCount={10}
			/>
		);
	}
	return null;
};
