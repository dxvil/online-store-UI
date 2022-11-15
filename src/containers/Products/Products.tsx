import React, { useEffect, useState, useMemo, useCallback } from "react";
import { IProduct } from "../../types/interfaces";
import { ProductItem } from "../../components/Product/ProductItem";
import { uuid } from "../../tools/uuid";
import { pagination } from "../../tools/pagination";
import { AppPagination } from "../../components/Pagination";
import { Categories } from "../../components/Categories";
import { Stack } from "@mui/material";
import styles from "../../assets/styles/Products.module.css";
import { Search } from "../../components/Search";
import { fetchAllProducts, fetchAllByCategory, CATEGORY_MODE } from "../../redux/reducers/productsReducer";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxTyped";
import { CategoryMode } from "../../types/redux";
import { fetchListOfCategories } from "../../redux/reducers/categoriesReducer";
import { useFilters } from "../../hooks/useFilters";


export const Products = ({maxElements, withPagination, purpose}: {maxElements: number, withPagination: boolean, purpose?: string}) => {
	const dispatch = useAppDispatch();
	const [input, setInput] = useState<string>("");
	const [activeCategory, setActiveCategory] = useState<number>(0);
	const [pageOfItems, setPageOfItems] = useState<number>(1);
	const allProducts = useAppSelector((state) => state.products.allProducts);
	const filteredProducts = useAppSelector((state) => state.products.filteredProducts);
	const { foundItemsList } = useFilters(allProducts, input);
	const filtered = useMemo(() => {
		return pagination<IProduct>(maxElements, pageOfItems, filteredProducts);
	}, [maxElements, pageOfItems, filteredProducts]);
	const searched = useMemo(() => {
		return pagination<IProduct>(maxElements, pageOfItems, foundItemsList);
	}, [maxElements, pageOfItems, foundItemsList]);

	// const onFindItem = () => {
	// 	const mode: CategoryMode = activeCategory ? CATEGORY_MODE.FILTERED : CATEGORY_MODE.ALL;
	// 	dispatch(findItem({input, mode}));
	// };

	const loadProductPage = () => {
		return Promise.all([dispatch(fetchAllProducts()), dispatch(fetchListOfCategories())]);
	};
	

	const onAmountOfItems = () => {
		if(input) {
			return Math.floor(foundItemsList.length / maxElements);
		}
		if(activeCategory) {
			return Math.floor(filteredProducts.length / maxElements);
		}
		return Math.floor(allProducts.length / maxElements);
	};

	const amountOfItems = useMemo(() => {
		return onAmountOfItems() ?? 1;
	}, [foundItemsList, filteredProducts, allProducts]);

	useEffect(() => {
		loadProductPage();
	}, []);

	useEffect(() => {
		if(activeCategory) {
			dispatch(fetchAllByCategory(activeCategory));
		}
	}, [activeCategory]);

	useCallback(() => {
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
				<Categories setActiveCategory={setActiveCategory} />
				<Search setInput={setInput}/>
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
			{input && searched && searched.length !== 0 && 
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

