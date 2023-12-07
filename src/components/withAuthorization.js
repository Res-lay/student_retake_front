import React from "react";
import {Navigate} from "react-router-dom";

const withAuthorization = (allowedRoles) => (WrappedComponent) => {
    return class withAuthorization extends React.Component{
        render() {
            const role = this.props;
            if (allowedRoles.include(role)){
                return <WrappedComponent {...this.props} />
            }else{
                return <Navigate to="/error" />
            }
        }
    }
}

export default withAuthorization;