import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./reducers/cartReducer";

export const store = configureStore({
	reducer: {
		cart: cartReducer.reducer,
	}
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;