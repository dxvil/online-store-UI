import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../api/api";
import { TCategories } from "../../types/IAPI";
import { CategoriesReducer } from "../../types/redux";

const initialState: CategoriesReducer = {
	categories: []
};

export const categoriesReducer = createSlice({
	name: "categories",
	initialState,
	reducers: {
	},
	extraReducers: (builder) => {
		builder.addCase(fetchListOfCategories.fulfilled, (state, action: PayloadAction<TCategories | undefined>) => {
			if(action.payload) {
				state.categories = action.payload;
			}
			return state;
		});
	}
});

export const fetchListOfCategories = createAsyncThunk(
	"products/fetchListOfCategories",
	async () => {
		return await api.categories.get();
	}
);
