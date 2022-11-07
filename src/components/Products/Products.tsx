import React, { useEffect, useState } from "react";
import { IProduct } from "../../types/interfaces";
import { ProductItem } from "../Product/ProductItem";
import { uuid } from "../../tools/uuid";
import { pagination } from "../../tools/pagination";
import { AppPagination } from "../Pagination/Pagination";
import { Categories } from "../Categories/Categories";
import {Stack} from "@mui/material";
import "./products.css";
import { Search } from "../Search/Search";
import { fetchAllProducts, fetchAllByCategory, findItem } from "../../redux/reducers/productsReducer";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxTyped";

export const Products = ({maxElements, withPagination, purpose}: {maxElements: number, withPagination: boolean, purpose?: string}) => {
	const dispatch = useAppDispatch();
	const [pageOfItems, setPageOfItems] = useState<number>(0);
	const activeCategory = useAppSelector((state) => state.products.activeCategory);
	const productsListLength = useAppSelector((state) => state.products.productsListLength);
	const filteredListLength = useAppSelector((state) => state.products.filteredListLength);
	const foundListLength = useAppSelector((state) => state.products.foundListLength);
	const input = useAppSelector((state) => state.products.input);
	const onAmountOfItems = () => {
		if(input) {
			return Math.floor(foundListLength / maxElements);
		}
		if(activeCategory) {
			return Math.floor(filteredListLength / maxElements);
		}
		return Math.floor(productsListLength / maxElements);
	};
	const amountOfItems = onAmountOfItems();
	const allProducts = useAppSelector((state) => state.products.allProducts);
	const filteredProducts = useAppSelector((state) => state.products.filteredProducts);
	const foundItemsList = useAppSelector((state) =>  state.products.foundItemsList);
	
	useEffect(() => {
		dispatch(fetchAllProducts());
	}, []);

	const onFindItem = () => {
		const mode = activeCategory ? "filtered" : "all";
		dispatch(findItem({input, mode}));
	};

	useEffect(() => {
		onFindItem();
	}, [input]);

	useEffect(() => {
		if(activeCategory) {
			dispatch(fetchAllByCategory(activeCategory));
		}
		if(input) {
			onFindItem();
		}
	}, [activeCategory]);

	useEffect(() => {
		setPageOfItems(0);
	}, [activeCategory, input]);

	return (
		<div className="products">
			{!purpose && 
			<Stack 
				className="products-filters"
				direction="row"
				justifyContent="center"
				alignItems="center">
				<Categories />
				<Search />
			</Stack>
			}
			{(activeCategory === 0 || activeCategory === null) && !input  && 
			pagination<IProduct>(maxElements, pageOfItems, allProducts)
				.map((item) => {
					return(
						<ProductItem item={item} key={uuid()} />
					);
				})
			}
			{activeCategory && !input && 
			pagination<IProduct>(maxElements, pageOfItems, filteredProducts)
				.map((item) => {
					return(
						<ProductItem item={item} key={uuid()} />
					);
				})
			}
			{input && 
			pagination<IProduct>(maxElements, pageOfItems, foundItemsList)
				.map((item) => {
					return(
						<ProductItem item={item} key={uuid()} />
					);
				})
			}
			{withPagination && amountOfItems &&
					<AppPagination 
						amountOfItems={amountOfItems} 
						pageOfItems={pageOfItems}
						pageSize={maxElements}
						setPageOfItems={setPageOfItems}/>
			}
		</div>
	);
};

