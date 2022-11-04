import React, { useEffect, useState } from "react";
import { IProduct } from "../../types/interfaces";
import { api } from "../../api/API";
import { ProductItem } from "../Product/ProductItem";
import { uuid } from "../../tools/uuid";
import { paginationSlicer } from "../../tools/pagination";
import { AppPagination } from "../Pagination/Pagination";
import "./products.css";

export const Products = () => {
	const maxElements = 9;
	const [products, setProducts] = useState<IProduct[]>([]);
	const [productsListLength, setProductListLength] = useState<number>(0);
	const [pageOfItems, setPageOfItems] = useState<number>(0);
	const amountOfItems =  productsListLength < maxElements ? 1 : Math.floor(productsListLength / maxElements);

	useEffect(() => {
		api.products.getAll().then((res: any) => {
			setProductListLength(res.length);
		});
	}, []);

	useEffect(() => {
		const offset = paginationSlicer(maxElements, pageOfItems);
		api.products.getAll(offset.toString(), maxElements.toString()).then((res: any) => {
			setProducts(res);
		});
	}, [pageOfItems]);
	
	return (
		<div className="products">
			{products && products.map((item) => {
				return(
					<ProductItem item={item} key={uuid()} />
				);
			})}
			<AppPagination amountOfItems={amountOfItems} setPageOfItems={setPageOfItems}/>
		</div>
	);
};
