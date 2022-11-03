import React, { useEffect, useState } from "react";
import { IProduct } from "../../types/interfaces";
import { api } from "../../api/API";
import { ProductItem } from "../Product/ProductItem";
import { uuid } from "../../tools/uuid";
import { pagination } from "../../tools/pagination";
import { AppPagination } from "../Pagination/Pagination";
import "./products.css";

export const Products = () => {
	const [products, setProducts] = useState<IProduct[]>([]);
	const [pageOfItems, setPageOfItems] = useState<number>(0);
	const amountOfItems =  products.length < 9 ? 1 : Math.ceil(products.length / 9);

	useEffect(() => {
		api.products.getAll().then((res: any) => {
			setProducts(res);
		});
	}, []);
	
	return (
		<div className="products">
			{products && pagination<IProduct>(9, pageOfItems, products, amountOfItems).map((item) => {
				return(
					<ProductItem item={item} key={uuid()} />
				);
			})}
			<AppPagination amountOfItems={amountOfItems} setPageOfItems={setPageOfItems}/>
		</div>
	);
};
