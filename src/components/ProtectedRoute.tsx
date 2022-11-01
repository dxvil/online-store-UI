import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ProtectedRoute = ({component}: {component: React.ReactNode}) => {
	const isAuthentificated = false; 
	const navigate = useNavigate();

	useEffect(() => {
		if(!isAuthentificated) {
			navigate("/login");
		}
	}, [isAuthentificated]);

	return (
		<>
			{component}
		</>
	);
};
