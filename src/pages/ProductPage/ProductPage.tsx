import React from "react";
import { AppMenu } from "../../components/Menu/AppMenu";
import { Products } from "../../components/Products/Products";
import { Footer } from "../../components/Footer/Footer";

export const ProductPage = () => {
	return (
		<div>
			<AppMenu />
			<Products maxElements={9} pagination={true} />
			<Footer />
		</div>
	);
};
