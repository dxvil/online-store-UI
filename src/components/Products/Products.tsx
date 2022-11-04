import React, { useEffect, useState } from "react";
import { IProduct } from "../../types/interfaces";
import { api } from "../../api/API";
import { ProductItem } from "../Product/ProductItem";
import { uuid } from "../../tools/uuid";
import { paginationSlicer } from "../../tools/pagination";
import { AppPagination } from "../Pagination/Pagination";
import "./products.css";

export const Products = ({maxElements, pagination}: {maxElements: number, pagination: boolean}) => {
	const [products, setProducts] = useState<IProduct[]>([]);
	const [productsListLength, setProductListLength] = useState<number>(0);
	const [pageOfItems, setPageOfItems] = useState<number>(0);
	const amountOfItems =  productsListLength < maxElements ? 1 : Math.floor(productsListLength / maxElements);

	useEffect(() => {
		api.products.getAll().then((res: IProduct[] | undefined) => {
			if(res && Array.isArray(res)) {
				setProductListLength(res.length);
			}
		});
	}, []);

	useEffect(() => {
		const offset = paginationSlicer(maxElements, pageOfItems);
		api.products.getAll(offset.toString(), maxElements.toString()).then((res: IProduct[] | undefined) => {
			if(res) {
				setProducts(res);
			}
		});
	}, [pageOfItems]);
	
	return (
		<div className="products">
			{products && products.map((item) => {
				return(
					<ProductItem item={item} key={uuid()} />
				);
			})}
			{pagination && 
					<AppPagination 
						amountOfItems={amountOfItems} 
						pageSize={maxElements}
						setPageOfItems={setPageOfItems}/>
			}
		</div>
	);
};
