import React, { useState, useEffect } from "react";
import { Input } from "@mui/material";
import { useDebounce } from "../../hooks/useDebounce";
import {onInputChange} from "../../redux/reducers/productsReducer";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxTyped";

export const Search = () => {
	const dispatch = useAppDispatch();
	const [value, setValue] = useState<string>("");
	const debouncedValue = useDebounce(value, 500);
	const savedValue = useAppSelector((state) => state.products.input);
	const onSearchChange = (value: string) => {
		dispatch(onInputChange(value));
	};

	useEffect(() => {
		onSearchChange(debouncedValue);
	}, [debouncedValue]);

	useEffect(() => {
		setValue(savedValue);
	}, []);

	return (
		<Input 
			value={value}
			sx={{width: "30%", padding: "1.35em 0", height: "2em"}}
			placeholder="Search"
			type="string"
			onChange={(e) => setValue(e.target.value)}
			name="search"/>
	);
};
