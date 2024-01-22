import React, { useContext } from 'react';
import { AuthContext } from '../store/auth-context';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);

    if(!user){
        return navigate("/signin");
    } 

    return children;
     
}

export default ProtectedRoute;