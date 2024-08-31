import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import {getRouterPath, PathRoot} from "../../../services/router.js";

const ProtectedRoute = ({ children }) => {

    const { token } = useSelector(state => state.auth);

    // user logged in
    if (token !== null) {
        return children;
    }

    return <Navigate to={getRouterPath(PathRoot)} />

}

export default ProtectedRoute