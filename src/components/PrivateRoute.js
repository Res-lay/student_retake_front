import React from "react";
import {Navigate} from "react-router-dom";

const PrivateRoute = ({children, roles}) => {
    const userRole = localStorage.getItem("userRole");
    if (!localStorage.getItem("JwtToken")){
        return <Navigate to="/auth" replace />;
    }else if(roles && !roles.includes(userRole)){
        console.log(roles);
        console.log(userRole);
        return <Navigate to="/forbidden" replace/>
    }
    return children;
};

export default PrivateRoute;