import React from "react";
import { Footer } from "../../components/Footer/Footer";
import { Products } from "../../components/Products/Products";
import {Header} from "../../containers/Header/Header";

const HomePage = () => {
	return (
		<div>
			<Header />
			<Products maxElements={6} pagination={false} />
			<Footer />
		</div>
	);
};

export default HomePage;