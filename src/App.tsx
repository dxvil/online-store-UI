import React, { useEffect } from "react";
import {
	createBrowserRouter,
	RouterProvider
} from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ErrorPage } from "./pages/ErrorPage/ErrorPage";
import HomePage from "./pages/HomePage/HomePage";
import { ProductPageItem } from "./pages/ProductItemPage/ProductPageItem";
import { ProductPage } from "./pages/ProductPage/ProductPage";
import { ProfilePage } from "./pages/ProfilePage/ProfilePage";
import { CartPage } from "./pages/CartPage/CartPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { countQuintity, countPrice } from "./redux/reducers/cartReducer";
import { useAppDispatch, useAppSelector } from "./hooks/reduxTyped";
import { onGetCookie, cookieName, onDeleteCookie } from "./tools/cookie";
import { useAuthentificaton } from "./hooks/useAuthentification";

const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
		errorElement: <ErrorPage />,
	},
	{
		path: "products",
		element: <ProductPage />,
		
	},
	{
		path: "products/:id",
		element: <ProductPageItem />
	},
	{
		path: "profile", 
		element: <ProtectedRoute component={<ProfilePage />} />,
	},
	{
		path: "/cart",
		element: <CartPage />
	},
	{
		path: "/login",
		element: <LoginPage />
	}
]);

const App = () => {
	const dispatch = useAppDispatch();
	const { items } = useAppSelector((state) => state.cart);
	const { getUser } = useAuthentificaton();

	useEffect(() => {
		//check is user token is still okay
		const cookie = onGetCookie(cookieName);
		if(cookie) {
			getUser(cookie).catch(() => {
				onDeleteCookie(cookieName);
			});
		}
	}, []);

	useEffect(() => {
		dispatch(countQuintity());
		dispatch(countPrice());
	}, [items]);

	return (
		<div className="App">
			<RouterProvider router={router} />
		</div>
	);
};

export default App;
