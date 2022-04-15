
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { ProSidebar, Menu, MenuItem, SidebarHeader, SidebarFooter, SidebarContent} from "react-pro-sidebar"

import './NavBar.css'

const NavBar = () => {

  const [menuCollapse, setMenuCollapse] = useState(false)

  const menuClick = () => {
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true)
  }


  return (
        <div id="sibebar">

          <ProSidebar collapsed={menuCollapse}/>
            <SidebarHeader/>
            <div className='logoText'>
              <p>{menuCollapse ? "logo": "big logo"}</p>
            </div>

          <NavLink to='/' exact={true} activeClassName='active' className="menu-item">
            Home
          </NavLink>
          <NavLink to='/login' exact={true} activeClassName='active' className="menu-item">
            Login
          </NavLink>
          <NavLink to='/sign-up' exact={true} activeClassName='active' className="menu-item">
            Sign Up
          </NavLink>
          <NavLink to='/users' exact={true} activeClassName='active' className="menu-item">
            Users
          </NavLink>
          <LogoutButton />
        </div>
  );
}

export default NavBar;
