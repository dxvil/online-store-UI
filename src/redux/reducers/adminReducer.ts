import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../api/API";
import { INewCategory, ICategory } from "../../types/interfaces";

const initialState = {
	isUpdatedCategory: false,
	isDeletedCategory: false,
	isCreatedCategory: false,
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
		},
		cancelCreatedCategoryState(state) {
			state.isCreatedCategory = false;
			return state;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(onCategoryUpdate.fulfilled, (state) => {
			state.isUpdatedCategory = true;
			return state;
		});
		builder.addCase(onCategoryDelete.fulfilled, (state) => {
			state.isDeletedCategory = true;
			return state;
		});
		builder.addCase(onCategoryCreate.fulfilled, (state) => {
			state.isCreatedCategory = true;
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
			console.log(err);
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

export const onCategoryCreate = createAsyncThunk(
	"createCategory",
	async (data: INewCategory) => {
		try{
			const res: any = await api.categories.create(data);
			return res;
		} catch(err) {
			return err;
		}
	}
);
export const {cancelDeletedCategoryState, cancelCreatedCategoryState, cancelUpdatedCategoryState} = adminReducer.actions;