import React from "react";
import { Footer } from "../components/Footer";
import { Products } from "../components/Products";
import { Header } from "../../containers/Header/Header";

const HomePage = () => {
	return (
		<div>
			<Header />
			<Products maxElements={6} withPagination={false} purpose="home" />
			<Footer />
		</div>
	);
};

export default HomePage;