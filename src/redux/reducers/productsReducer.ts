import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IProductsState } from "../../types/redux";
import { api } from "../../api/API";
import { FetchStatus } from "../../types/redux";

export const FETCH_STATES: {[key: string]: FetchStatus} = {
	NOT_STARTED: "notStarted",
	PENDING: "pending",
	DONE: "done"
};

const initialState: IProductsState = {
	fetchStatus: {
		singleProduct: FETCH_STATES.NOT_STARTED,
		products: FETCH_STATES.NOT_STARTED,
		productsByCategories: FETCH_STATES.NOT_STARTED
	},
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

export const CATEGORY_MODE = {
	FILTERED: "filtered",
	ALL: "all"
};


export const productsReducer = createSlice({
	name: "products",
	initialState,
	reducers: {
		onInputChange(state, action) {
			return {
				...state, 
				input: action.payload
			};
		},
		onActiveCategoryChange(state, action) {
			return {
				...state, 
				activeCategory: action.payload
			};
		},
		findItem(state, action) {
			const foundItems = (action.payload.mode === CATEGORY_MODE.ALL ? 
				state.allProducts 
				: state.filteredProducts
			)
				.filter((item) => item.title.toLowerCase().includes(action.payload.input.toLowerCase()));
			return {
				...state, 
				foundItemsList: foundItems, 
				foundListLength: foundItems.length
			};
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
		builder.addCase(fetchProduct.pending, (state) => {
			state.fetchStatus.singleProduct = FETCH_STATES.PENDING;
			return state;
		});
		builder.addCase(fetchProduct.fulfilled, (state, action) => {
			state.product = action.payload ? action.payload : null;
			state.fetchStatus.singleProduct = FETCH_STATES.DONE;
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