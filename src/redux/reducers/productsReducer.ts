import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {IProduct} from "../../types/interfaces";
import { api } from "../../api/API";

interface IProductsState {
    allProducts: IProduct[]
    filteredProducts: IProduct[]
    searchItem: null | IProduct
	productsListLength: number
}
const initialState: IProductsState = {
	allProducts: [],
	filteredProducts: [],
	searchItem: null,
	productsListLength: 0
};

export const productsReducer = createSlice({
	name: "products",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
			if(action.payload) {
				if(state.productsListLength === 0) {
					state.productsListLength = action.payload.length;
				}
				state.allProducts = [...action.payload];
			}
		});
		builder.addCase(fetchAllByCategory.fulfilled, (state, action) => {
			if(action.payload) {
				state.filteredProducts = [...action.payload];
			}
		});
	},
});

export const fetchAllProducts = createAsyncThunk(
	"products/fetchAllProducts",
	async (params?: {offset?: string, maxElements?: string}) => {
		console.log(params);
		if(params && "offset" in params) {
			const {offset, maxElements} = params;
			return await api.products.getAll(offset, maxElements);
		}
		return await api.products.getAll();
	}
);

const fetchAllByCategory = createAsyncThunk(
	"products/fetchAllByCategory",
	async (activeCategory: number) => {
		return await api.categories.getAllByCategory(activeCategory);
	}
);