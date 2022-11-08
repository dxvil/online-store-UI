import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/API";
type State = {
    isLogin: boolean
}
const initialState: State = {
	isLogin: false
};

export const userReducer = createSlice({
	name: "user", 
	initialState,
	reducers: {
        
	},
});

export const authentificate = createAsyncThunk(
	"authentificate", 
	async (token: string) => {
		try {
			return await api.authentication.authentificate(token);
		} catch(err) {
			return err;
		}
	}
);

