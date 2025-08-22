import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const PrivateRoute = ({ children }) => {
    const { userData } = useAuth();
    return userData ? children : <Navigate to="/login" replace />;

};

export default PrivateRoute;
