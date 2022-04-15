
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from './auth/LogoutButton';
import { ProSidebar, Menu, MenuItem, SidebarHeader, SidebarFooter, SidebarContent} from "react-pro-sidebar"
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";

import './NavBar.css'

const NavBar = () => {

  const user = useSelector(state => state.session.user)

  const [menuCollapse, setMenuCollapse] = useState(false)

  const menuClick = () => {
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true)
  }


  return (
      <>
        <div id="sidebar">
          <ProSidebar collapsed={menuCollapse}>
            <SidebarHeader>
            <div className='logoText'>
              <p>{user?.name}</p>
            </div>
            <div className='closeMenu' onClick={menuClick}>
              {menuCollapse ?  <FiArrowRightCircle/> : <FiArrowLeftCircle/>}
            </div>
            </SidebarHeader>
            <SidebarContent>
              <Menu iconShape='circle'>
                <MenuItem icon={<FiHome/>} >
                  <NavLink to='/' exact={true} active={true} activeClassName='active'>Home</NavLink>
                </MenuItem>
                <MenuItem>
                  <NavLink to='/login' exact={true} activeClassName='active'>Login</NavLink>
                </MenuItem>
                <MenuItem>
                  <NavLink to='/sign-up' exact={true} activeClassName='active'>Sign Up</NavLink>
                </MenuItem>
                <MenuItem>
                  <NavLink to='/users' exact={true} activeClassName='active'>Users</NavLink>
                </MenuItem>
                
              </Menu>
            </SidebarContent>
            <SidebarFooter>
              <Menu iconShape='square'>
                <MenuItem icon={<FiLogOut/>}><LogoutButton /></MenuItem>
              </Menu>
            </SidebarFooter>
          </ProSidebar>
        </div>
      </>
  );
}

export default NavBar;
