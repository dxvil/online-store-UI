import React from "react";
import { Input } from "@mui/material";

interface ISearch {
    search: (input: string) => void
}
export const Search = ({search}: ISearch) => {
	return (
		<Input 
			placeholder="Search"
			type="string"
			onChange={(e) => search(e.target.value)}
			name="search"/>
	);
};
