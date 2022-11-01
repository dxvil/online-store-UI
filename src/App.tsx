import React from "react";
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ErrorPage } from "./pages/ErrorPage/ErrorPage";
import HomePage from "./pages/HomePage/HomePage";
import { ProductPage } from "./pages/ProductPage/ProductPage";
import { ProfilePage } from "./pages/ProfilePage/ProfilePage";

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
		path: "profile", 
		element: <ProtectedRoute component={<ProfilePage />} />,
	}
]);

function App() {
	return (
		<div className="App">
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
