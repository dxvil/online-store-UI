import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/API";

const initialState = {
	isUpdatedCategory: false,
	isDeletedCategory: false
};

export const adminReducer = createSlice({
	name: "admin",
	initialState,
	reducers: {
		cancelUpdatedCategoryState(state) {
			state.isUpdatedCategory = false;
			return state;
		},
		cancelDeletedCategoryState(state) {
			state.isDeletedCategory = false;
			return state;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(onCategoryUpdate.fulfilled, (state, action) => {
			state.isUpdatedCategory = true;
			return state;
		});
		builder.addCase(onCategoryDelete.fulfilled, (state, action) => {
			state.isDeletedCategory = true;
			return state;
		});
	}
});

export const onCategoryUpdate = createAsyncThunk(
	"updateCategory",
	async (data: {id: number, body: object}) => {
		try {
			const res = await api.categories.update(data.id, data.body);
			return res;
		}
		catch(err) {
			return err;
		}
	}
);

export const onCategoryDelete = createAsyncThunk(
	"deleteCategory",
	async (id: number) => {
		try{
			const res = await api.categories.delete(id);
			return res;
		} catch(err) {
			return err;
		}
	}
);

export const {cancelDeletedCategoryState, cancelUpdatedCategoryState} = adminReducer.actions;