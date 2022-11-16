import React from "react";
import { Pagination } from "@mui/material";
import { IPagination } from "../types/interfaces";

export const AppPagination = ({amountOfItems, pageOfItems, setPageOfItems} : IPagination) => {
	const onPage = (page: number): void => {
		if(setPageOfItems) {
			setPageOfItems(page);
		}
	};
	
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
			count={amountOfItems()}
			onChange={(e: React.BaseSyntheticEvent, page: number) => onPage(page)}
			page={pageOfItems}
			defaultPage={pageOfItems}
			boundaryCount={10}
		/>
	);
};
