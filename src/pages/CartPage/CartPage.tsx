import React from "react";
import { Cart } from "../../components/Cart/Cart";
import { AppMenu } from "../../components/Menu/AppMenu";

export const CartPage = () => {
	return (
		<div>
			<AppMenu />
			<Cart />
		</div>
	);
};
