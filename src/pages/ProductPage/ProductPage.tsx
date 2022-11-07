import React from "react";
import { AppMenu } from "../../components/Menu/AppMenu";
import { Products } from "../../components/Products";
import { Footer } from "../../components/Footer";

export const ProductPage = () => {
	return (
		<div className="page">
			<AppMenu />
			<Products maxElements={9} withPagination={true} />
			<Footer />
		</div>
	);
};
