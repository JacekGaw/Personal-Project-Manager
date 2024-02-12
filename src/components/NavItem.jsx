import React from 'react';
import { NavLink } from 'react-router-dom';

const NavItem = ({linkTo, label, icon}) => {

    return (
        <li className=" hover:bg-jeans  transition-all duration-200  w-full rounded-l-md">
          <NavLink
            exact="true"
            to={linkTo}
            end
            className={({ isActive }) =>
              isActive
                ? "flex gap-2 w-full justify-center sm:justify-start py-2 px-2 bg-jeans sm:rounded-l-md"
                : "flex gap-2 w-full justify-center sm:justify-start py-2 px-2"
            }
          >
            <p className='material-symbols-outlined justify-center items-center'>{icon}</p>
            <p className='hidden md:flex'>{label}</p>
          </NavLink>
        </li>
    )
}

export default NavItem;