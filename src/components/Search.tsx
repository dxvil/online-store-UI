import React, { useState, useEffect } from "react";
import { Input } from "@mui/material";
import { useDebounce } from "../hooks/useDebounce";

interface ISearch {
	setInput: (value: string) => void
}

export const Search = ({setInput}: ISearch) => {
	const [value, setValue] = useState<string>("");
	const debouncedValue = useDebounce(value, 500);
	
	useEffect(() => {
		setInput(debouncedValue);
	}, [debouncedValue]);

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
