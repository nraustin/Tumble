
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from './auth/LogoutButton';
import { ProSidebar, Menu, MenuItem, SidebarHeader, SidebarFooter, SidebarContent} from "react-pro-sidebar"
import { FiHome, FiLogIn, FiLogOut, FiHeart, FiUserPlus, FiUser, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";

import "react-pro-sidebar/dist/css/styles.css";
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
            {user ? 
            <div className='userBox'>
              {user.images[0] ? <img className='userIcon' src={user.images[0].userImage} alt='https://www.pinclipart.com/picdir/middle/190-1902439_dog-daycare-twitter-round-logo-png-transparent-background.png'/> : <img className= 'userIcon' src='https://www.pinclipart.com/picdir/middle/190-1902439_dog-daycare-twitter-round-logo-png-transparent-background.png' alt=''/>}
              <div className='userText'>
                <p>{user?.name}</p>
              </div>
            </div>
            : null }
            <div className='closeMenu' onClick={menuClick}>
              {menuCollapse ? 
              <div className='closeMenuArrows'> 
              <FiArrowRightCircle/>
              </div> : 
              <div className='closeMenuArrows'> 
              <FiArrowLeftCircle/> 
              </div>}
            </div>
            </SidebarHeader>
            <SidebarContent>
              <Menu iconShape='circle'>
                <MenuItem icon={<FiHome/>}>
                  <NavLink to='/' exact={true} active={true} activeClassName='active'>Home</NavLink>
                </MenuItem>
                
                {user ?
                <MenuItem icon={<FiUser/>}>
                  <NavLink to={`/users/profile`} exact={true} activeClassName='active'>My Profile</NavLink>
                </MenuItem> : null}

                {user ? null :
                <>
                    <MenuItem icon={<FiLogIn/>}>
                      <NavLink to='/login' exact={true} activeClassName='active'>Login</NavLink>
                    </MenuItem>
                    <MenuItem icon={<FiUserPlus/>}>
                      <NavLink to='/sign-up' exact={true} activeClassName='active'>Sign Up</NavLink>
                    </MenuItem>
                </> }
                <MenuItem icon={<FiHeart/>}>
                  <NavLink to='/users' exact={true} activeClassName='active'>Browse</NavLink>
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
