import React, { useEffect, useState } from "react";
import { TextField, Select, MenuItem } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxTyped";
import { fetchListOfCategories } from "../../redux/reducers/productsReducer";
import { IProductForm, IProduct } from "../../types/interfaces";

export const ProductsForm = ({values, onChange}: IProductForm) => {
	const categories = useAppSelector((state) => state.products.categories);
	const dispatch = useAppDispatch();
	const [title, setTitle] = useState<string>("");
	const [category, setCategory] = useState<number>(1);
	const [price, setPrice] = useState<number>(1);
	const [description, setDescription] = useState<string>("");
	const [images, setImages] = useState<string[]>([]);

	useEffect(() => {
		dispatch(fetchListOfCategories());
	}, []);

	const setupValues = () => {
		if(values !== undefined) {
			if("title" in values) setTitle(values["title"]);
			if("category" in values) setCategory(values?.category?.id);
			if("price" in values) setPrice(values?.price);
			if("description" in values) setDescription(values?.description);
			if("images" in values) setImages(values.images);
		}
	};

	useEffect(() => {
		if(values) {
			setupValues();
		}
	}, [values]);
    
	useEffect(() => {
		onChange({
			title, 
			[values ? "category" : "categoryId"]: values ? categories.find((item) => item.id === category) : category, 
			price, 
			description, 
			images
		});
	}, [title, category, price, description, images]);

	return (
		<>
			<TextField sx={{width: "60%"}}
				type="text"
				label="title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				variant="outlined" />
			<TextField sx={{width: "60%"}}
				type="number"
				value={price}
				onChange={(e) => setPrice(Number(e.target.value))}
				label="price" 
				variant="outlined" />
			<Select
				value={category}
				onChange={(e) => setCategory(Number(e.target.value))}
				label="Category">
				{categories.map((category) => {
					return (
						<MenuItem key={category?.id} value={category?.id}>
							<em>{category.name}</em>
						</MenuItem>
					);
				})}
			</Select>
			<TextField sx={{width: "60%"}}
				type="text"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				label="description" 
				variant="outlined" />
			<TextField sx={{width: "60%"}}
				type="url"
				value={images[0]}
				onChange={(e) => setImages([e.target.value])}
				id="outlined-basic" 
				label="image" 
				variant="outlined" />
		</>
	);
};
