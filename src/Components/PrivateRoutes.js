import { Navigate, Outlet } from "react-router-dom";
import React from "react";
const  PrivateRoutes = () => {
	 let userToken = localStorage.getItem("jwtToken");
	// userToken = "test";
	let auth = (!userToken || userToken === "undefined")?false:true;
	return auth ? <Outlet /> : <Navigate to='/login' />;
};
export default PrivateRoutes;