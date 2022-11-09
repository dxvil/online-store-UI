import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxTyped";

export const ProtectedRoute = ({component}: {component: React.ReactNode}) => {
	const isAuthentificated = useAppSelector((state) => state.user.isLogin); 
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
