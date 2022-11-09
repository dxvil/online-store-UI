import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/API";

const initialState = {
	isUpdated: false
};

export const adminReducer = createSlice({
	name: "admin",
	initialState,
	reducers: {

	},
	extraReducers: (builder) => {
		builder.addCase(onCategoryUpdate.fulfilled, (state, action) => {
			state.isUpdated = true;
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

// export const {  } = cartReducer.actions;