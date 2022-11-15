import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/api";
import { INewCategory, IProduct, INewProduct } from "../../types/interfaces";

const initialState = {
	isUpdatedCategory: false,
	isDeletedCategory: false,
	isCreatedCategory: false,
	isUpdatedProduct: false,
	isDeletedProduct: false,
	isCreatedProduct: false,
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
			state.isCreatedProduct = false;
			return state;
		},
		cancelUpdatedProductState(state) {
			state.isUpdatedProduct = false;
			return state;
		},
		cancelDeletedProductState(state) {
			state.isDeletedCategory = false;
			return state;
		},
		cancelCreatedProductState(state) {
			state.isCreatedProduct = false;
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
		builder.addCase(onProductUpdate.fulfilled, (state) => {
			state.isUpdatedProduct = true;
			return state;
		});
		builder.addCase(onProductCreate.fulfilled, (state) => {
			state.isCreatedProduct = true;
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

export const onProductCreate = createAsyncThunk(
	"createProduct",
	async (data: INewProduct) => {
		try{
			const res: any = await api.products.create(data);
			return res;
		} catch(err) {
			return err;
		}
	}
);

export const onProductUpdate = createAsyncThunk(
	"updateProduct",
	async (data: { product: Partial<IProduct>; id: number; }) => {
		try{
			const res: any = await api.products.update(data);
			return res;
		} catch(err) {
			return err;
		}
	}
);

export const {
	cancelDeletedCategoryState, 
	cancelCreatedCategoryState, 
	cancelUpdatedCategoryState,
	cancelCreatedProductState,
	cancelDeletedProductState, 
	cancelUpdatedProductState,

} = adminReducer.actions;