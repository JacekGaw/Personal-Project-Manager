import React from 'react';
import { AuthContext } from '../store/auth-context';
import { NavLink } from 'react-router-dom';

const Nav = () => {
    

    return (
        <nav>
            <ul>
                <NavLink to="/">Personal Manager</NavLink>
                <NavLink to="/dashboard">Dashboard</NavLink>
                <NavLink to="/account">Account</NavLink>
            </ul>
        </nav>
    )
}