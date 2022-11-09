import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./reducers/cartReducer";
import { productsReducer } from "./reducers/productsReducer";
import { userReducer } from "./reducers/userReducer";
import { adminReducer } from "./reducers/adminReducer";

export const store = configureStore({
	reducer: {
		cart: cartReducer.reducer,
		products: productsReducer.reducer,
		user: userReducer.reducer,
		admin: adminReducer.reducer
	}
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;