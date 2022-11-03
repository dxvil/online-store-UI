import React from "react";
import { IProduct } from "../../types/interfaces";

export const ProductItem = ({item}: {item: IProduct}) => {
	return (
		<div>
			{item.title}
		</div>
	);
};
