import React, { useEffect, useState,useMemo } from "react";
import { IProduct } from "../../types/interfaces";
import { ProductItem } from "../../components/Product/ProductItem";
import { uuid } from "../../tools/uuid";
import { pagination } from "../../tools/pagination";
import { AppPagination } from "../../components/Pagination";
import { Categories } from "../../components/Categories";
import { Stack } from "@mui/material";
import styles from "../assets/styles/Products.module.css";
import { Search } from "../../components/Search";
import { fetchAllProducts, fetchAllByCategory, findItem, CATEGORY_MODE } from "../../redux/reducers/productsReducer";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxTyped";
import { CategoryMode } from "../../types/redux";

export const Products = ({maxElements, withPagination, purpose}: {maxElements: number, withPagination: boolean, purpose?: string}) => {
	const dispatch = useAppDispatch();
	const [pageOfItems, setPageOfItems] = useState<number>(1);
	const activeCategory = useAppSelector((state) => state.products.activeCategory);
	const productsListLength = useAppSelector((state) => state.products.productsListLength);
	const filteredListLength = useAppSelector((state) => state.products.filteredListLength);
	const foundListLength = useAppSelector((state) => state.products.foundListLength);
	const input = useAppSelector((state) => state.products.input);
	const allProducts = useAppSelector((state) => state.products.allProducts);
	const filteredProducts = useAppSelector((state) => state.products.filteredProducts);
	const foundItemsList = useAppSelector((state) =>  state.products.foundItemsList);
	const filtered = useMemo(() => {
		return pagination<IProduct>(maxElements, pageOfItems, filteredProducts);
	}, [maxElements, pageOfItems, filteredProducts]);
	const searched = useMemo(() => {
		return pagination<IProduct>(maxElements, pageOfItems, foundItemsList);
	}, [maxElements, pageOfItems, foundItemsList]);

	const onFindItem = () => {
		const mode: CategoryMode = activeCategory ? CATEGORY_MODE.FILTERED : CATEGORY_MODE.ALL;
		dispatch(findItem({input, mode}));
	};

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
	
	useEffect(() => {
		dispatch(fetchAllProducts());
	}, []);

	useEffect(() => {
		if(input) {
			onFindItem();
		}
	}, [input, filteredListLength, activeCategory]);

	useEffect(() => {
		if(activeCategory) {
			dispatch(fetchAllByCategory(activeCategory));
		}
	}, [activeCategory]);

	useEffect(() => {
		setPageOfItems(1);
	}, [activeCategory, input]);

	return (
		<div className={styles.products}>
			{!purpose && 
			<Stack 
				className={styles["products-filters"]}
				direction="row"
				justifyContent="center"
				alignItems="center">
				<Categories />
				<Search />
			</Stack>
			}
			{!activeCategory && input === "" &&
				pagination<IProduct>(maxElements, pageOfItems, allProducts)
					.map((item) => {
						return(
							<ProductItem item={item} key={uuid()} />
						);
					})
			}
			{activeCategory && input === "" && filtered.length !== 0 &&
				filtered.map((item) => {
					return(
						<ProductItem item={item} key={uuid()} />
					);
				})
			}
			{input && searched.length !== 0 && 
			searched.map((item) => {
				return(
					<ProductItem item={item} key={uuid()} />
				);
			})
			}
			{withPagination && amountOfItems > 0 &&
					<AppPagination 
						amountOfItems={amountOfItems} 
						pageOfItems={pageOfItems}
						pageSize={maxElements}
						setPageOfItems={setPageOfItems}/>
			}
		</div>
	);
};

