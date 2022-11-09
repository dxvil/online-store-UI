import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../api/API";
import { IUser, LoginErr } from "../../types/IAPI";
import { UserReducer } from "../../types/redux";

const initialState: UserReducer = {
	isLogin: false,
	user: undefined
};

export const userReducer = createSlice({
	name: "user", 
	initialState,
	reducers: {
		onCurrentUser(state, action: PayloadAction<IUser | LoginErr | undefined>) {
			if(action.payload !== undefined && "name" in action.payload) {
				state = {
					isLogin: true,
					user: {
						id: action.payload.id,
						name: action.payload.name,
						role: action.payload.role
					}
				};
			}
			return state;
		}
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

export const { onCurrentUser } = userReducer.actions;