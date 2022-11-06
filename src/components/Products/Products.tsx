import React, { useEffect, useState } from "react";
import { IProduct } from "../../types/interfaces";
import { api } from "../../api/API";
import { ProductItem } from "../Product/ProductItem";
import { uuid } from "../../tools/uuid";
import { pagination as paginationF, paginationSlicer } from "../../tools/pagination";
import { AppPagination } from "../Pagination/Pagination";
import { Categories } from "../Categories/Categories";
import {Stack} from "@mui/material";
import "./products.css";
import { Search } from "../Search/Search";
import { fetchAllProducts } from "../../redux/reducers/productsReducer";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxTyped";
export const Products = ({maxElements, pagination}: {maxElements: number, pagination: boolean}) => {
	const [products, setProducts] = useState<IProduct[]>([]);
	const productsListLength = useAppSelector((state) => state.products.productsListLength);
	const [pageOfItems, setPageOfItems] = useState<number>(0);
	const amountOfItems =  productsListLength < maxElements ? 0 : Math.floor(productsListLength / maxElements);
	const [activeCategory, setActiveCategory] = useState<number | null>(null);
	const [input, setInput] = useState<string>("");
	const dispatch = useAppDispatch();
	const allProducts = useAppSelector((state) => state.products.allProducts);
	const searchItem = (input: string): void => {
		setActiveCategory(null);
		setInput(input);
	};
	
	useEffect(() => {
		dispatch(fetchAllProducts());

	}, []);
	console.log(amountOfItems);

	useEffect(() => {
		if(!activeCategory) {
			const offset = paginationSlicer(maxElements, pageOfItems);
			dispatch(fetchAllProducts({
				offset: offset.toString(), 
				maxElements: maxElements.toString()
			}));
		}
	}, [pageOfItems]);

	useEffect(() => {
		if(activeCategory) {
			setPageOfItems(0);
			api.categories.getAllByCategory(activeCategory)
				.then((res: IProduct[] | undefined) => {
					if(res) {
						// setProductListLength(res.length);
						setProducts(res);
					}
				});
		}
	}, [activeCategory]);
	
	return (
		<div className="products">
			<Stack sx={{width: "100%", margin: "4em 0 2em 0"}} alignItems="center">
				<Categories 
					setActiveCategory={setActiveCategory} 
					activeCategory={activeCategory}
				/>
				<Search search={searchItem} />
			</Stack>
			
			{!activeCategory && allProducts && productsListLength && allProducts.map((item) => {
				return(
					<ProductItem item={item} key={uuid()} />
				);
			})}

			{activeCategory && products && paginationF<IProduct>(maxElements, pageOfItems, products).map((item) => {
				return(
					<ProductItem item={item} key={uuid()} />
				);
			})}
			{pagination && 
					<AppPagination 
						amountOfItems={amountOfItems} 
						pageOfItems={pageOfItems}
						pageSize={maxElements}
						setPageOfItems={setPageOfItems}/>
			}
		</div>
	);
};
