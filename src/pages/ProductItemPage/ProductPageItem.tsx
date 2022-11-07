import React from "react";
import { AppMenu } from "../../components/Menu/AppMenu";
import { Product } from "../../components/Product/Product";
import { Footer } from "../components/Footer";

export const ProductPageItem = () => {
	return (
		<div>
			<AppMenu />
			<Product />
			<Footer />
		</div>
	);
};
