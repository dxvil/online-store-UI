import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/api";
import { IProductsState, FetchStatus } from "../../types/redux";

export const FETCH_STATES: {[key: string]: FetchStatus} = {
	NOT_STARTED: "notStarted",
	PENDING: "pending",
	DONE: "done"
};

const initialState: IProductsState = {
	fetchStatus: {
		singleProductStage: FETCH_STATES.NOT_STARTED,
		productsStage: FETCH_STATES.NOT_STARTED,
		productsByCategoriesStage: FETCH_STATES.NOT_STARTED
	},
	allProducts: [],
	filteredProducts: [],
};

export const productsReducer = createSlice({
	name: "products",
	initialState,
	reducers: {
	},
	extraReducers: (builder) => {
		builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
			if(action.payload) {
				state.allProducts = [...action.payload];
			}
			return state;
		});
		builder.addCase(fetchAllByCategory.fulfilled, (state, action) => {
			if(action.payload) {
				state.filteredProducts = [...action.payload];
			}
			return state;
		});
	}
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

export const fetchAllByCategory = createAsyncThunk(
	"products/fetchAllByCategory",
	async (activeCategory: number) => {
		return await api.categories.getAllByCategory(activeCategory);
	}
);
