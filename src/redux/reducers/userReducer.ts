import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../api/api";
import { INewUser, IUser, LoginErr } from "../../types/IAPI";
import { UserReducer } from "../../types/redux";

const initialState: UserReducer = {
	isLogin: false,
	user: undefined,
	newUser: undefined,
	isCreatingNewUser: false
};

export const userReducer = createSlice({
	name: "user", 
	initialState,
	reducers: {
		onCurrentUser(state, action: PayloadAction<IUser | LoginErr | undefined>) {
			if(action.payload !== undefined && "name" in action.payload) {
				return {
					...state,
					isLogin: true,
					user: {
						id: action.payload.id,
						name: action.payload.name,
						role: action.payload.role
					}
				};
			}
			return state;
		},
		onLogout(state) {
			return {
				...state, 
				isLogin: false, 
				user: undefined
			};
		}
	},
	extraReducers: (builder) => {
		builder.addCase(registrationNewUser.fulfilled, (state, action: PayloadAction<INewUser | any>) => {
			if("name" in action.payload) {
				return {
					...state, 
					newUser: {
						email: action.payload.email
					}, 
					isCreatingNewUser: true
				};
			}
			return state;
		});
		builder.addCase(registrationNewUser.pending, (state) => {
			return {...state, isCreatingNewUser: true};
		});
	}
});

export const registrationNewUser = createAsyncThunk(
	"registration",
	async(data: INewUser) => {
		try	{
			return api.authentication.registration(data);
		} catch(err) {
			return err;
		}
	}
);


export const { onCurrentUser, onLogout } = userReducer.actions;