import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../store/auth-context';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {

    const {user} = useContext(AuthContext);

    if(!user){
        return <Navigate to="/Signin" replace={true}/>;
    } 


    return children;
     
}

export default ProtectedRoute;