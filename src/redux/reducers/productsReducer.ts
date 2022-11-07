import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IProductsState } from "../../types/redux";
import { api } from "../../api/API";

const initialState: IProductsState = {
	allProducts: [],
	filteredProducts: [],
	foundItemsList: [],
	categories: [],
	searchItem: null,
	productsListLength: 0,
	filteredListLength: 0,
	foundListLength: 0,
	activeCategory: null,
	input: "",
	product: null
};

export const productsReducer = createSlice({
	name: "products",
	initialState,
	reducers: {
		onInputChange(state, action) {
			state.input = action.payload;
			return state;
		},
		onActiveCategoryChange(state, action) {
			state.activeCategory = action.payload;
			return state;
		},
		findItem(state, action) {
			const foundItems = (action.payload.mode === "all" ? 
				state.allProducts 
				: state.filteredProducts
			)
				.filter((item) => item.title.includes(action.payload.input));

			state.foundItemsList = foundItems;
			state.foundListLength = foundItems.length;
			return state;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
			if(action.payload) {
				if(state.productsListLength === 0) {
					state.productsListLength = action.payload.length;
				}
				state.allProducts = [...action.payload];
			}
			return state;
		});
		builder.addCase(fetchAllByCategory.fulfilled, (state, action) => {
			if(action.payload) {
				state.filteredListLength = action.payload.length;
				state.filteredProducts = [...action.payload];
			}
			return state;
		});
		builder.addCase(fetchListOfCategories.fulfilled, (state, action) => {
			if(action.payload) {
				state.categories = action.payload;
			}
			return state;
		});
		builder.addCase(fetchProduct.fulfilled, (state, action) => {
			state.product = action.payload ? action.payload : null;
			return state;
		});
	},
});

export const fetchAllProducts = createAsyncThunk(
	"products/fetchAllProducts",
	async (params?: {offset?: string, maxElements?: string}) => {
		if(params && "offset" in params) {
			const {offset, maxElements} = params;
			return await api.products.getAll(offset, maxElements);
		}
		return await api.products.getAll();
	}
);

export const fetchProduct = createAsyncThunk(
	"products/fetchProduct",
	async (id: number) => {
		return await api.products.get(id);
	}
);

export const fetchAllByCategory = createAsyncThunk(
	"products/fetchAllByCategory",
	async (activeCategory: number) => {
		return await api.categories.getAllByCategory(activeCategory);
	}
);

export const fetchListOfCategories = createAsyncThunk(
	"products/fetchListOfCategories",
	async () => {
		return await api.categories.get();
	}
);

export const { findItem, onInputChange, onActiveCategoryChange} = productsReducer.actions;