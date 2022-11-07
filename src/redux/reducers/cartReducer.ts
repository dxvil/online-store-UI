import { createSlice } from "@reduxjs/toolkit";
import { CartState } from "../../types/redux";

const initialState: CartState = {
	items: [],
	quintity: 0,
	price: 0
};

export const cartReducer = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addItem (state, action) {
			const equalItem = state.items.find((item) => item.id === action.payload.id);
			if(equalItem !== undefined) {
				equalItem.quintity += 1;
				return state;
			}
			const newItem = {...action.payload, quintity: 1};
			
			return {...state, items: [...state.items, newItem]};
		},
		removeItem (state, action) {
			const equalItem = state.items.find((item) => item.id === action.payload.id);
			if(equalItem !== undefined && equalItem.quintity > 1) {
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
		},
		countPrice (state) {
			const price = state.items.reduce((prev, next) => {
				return prev + next.price;
			}, 0);
			return {...state, price: price};
		}
	}
});


export const { addItem, removeItem, countQuintity, countPrice } = cartReducer.actions;