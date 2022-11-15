import { createSlice } from "@reduxjs/toolkit";
import { CartState } from "../../types/redux";

const initialState: CartState = {
	items: [],
	quintity: 0
};

export const cartReducer = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addItem (state, action) {
			const equalItem = state.items.find((item) => item.id === action.payload.id);
			if(equalItem) {
				equalItem.quintity += 1;
				return state;
			}
			const newItem = {...action.payload, quintity: 1};
			
			return {...state, items: [...state.items, newItem]};
		},
		removeItem (state, action) {
			const equalItem = state.items.find((item) => item.id === action.payload.id);
			if(equalItem && equalItem.quintity > 1) {
				equalItem.quintity--;
				return state;
			}
			const newItemsState = state.items.filter((item) => item.id !== action.payload.id);
			return {...state, items: newItemsState};
		},
		countQuintity (state) {
			const newQuintity = state.items.reduce((prev, next) => {
				return prev + next.quintity;
			}, 0);
			return {...state, quintity: newQuintity};
		}
	}
});


export const { addItem, removeItem, countQuintity } = cartReducer.actions;