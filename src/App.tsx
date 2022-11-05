import React, { useEffect } from "react";
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ErrorPage } from "./pages/ErrorPage/ErrorPage";
import HomePage from "./pages/HomePage/HomePage";
import { ProductPageItem } from "./pages/ProductItemPage/ProductPageItem";
import { ProductPage } from "./pages/ProductPage/ProductPage";
import { ProfilePage } from "./pages/ProfilePage/ProfilePage";
import { countQuintity } from "./redux/reducers/cartReducer";
import { useAppDispatch, useAppSelector } from "./hooks/reduxTyped";

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
	}
]);

const App = () => {
	const dispatch = useAppDispatch();
	const {items} = useAppSelector((state) => state.cart);

	useEffect(() => {
		dispatch(countQuintity());
	}, [items]);

	return (
		<div className="App">
			<RouterProvider router={router} />
		</div>
	);
};

export default App;
