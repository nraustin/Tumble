
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LogoutButton from './auth/LogoutButton';
import { ProSidebar, Menu, MenuItem, SidebarHeader, SidebarFooter, SidebarContent} from "react-pro-sidebar"
import { FiHome, FiLogIn, FiLogOut, FiHeart, FiThumbsUp, FiUserPlus, FiUser, FiUsers, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";

import * as profileActions from '.././store/profile'
import "react-pro-sidebar/dist/css/styles.css";
import './NavBar.css'

const NavBar = () => {

  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch()

  const [menuCollapse, setMenuCollapse] = useState(false)

  useEffect(() =>{
    dispatch(profileActions.getUserThunk(user?.id))
  }, [dispatch, user?.id, user?.matches])

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
              {user.images[0] ? <img className='userIcon' src={user.images[0].userImage} alt='https://cdn-icons-png.flaticon.com/512/616/616408.png'/> : <img className= 'userIcon' src='https://cdn-icons-png.flaticon.com/512/616/616408.png' alt=''/>}
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
                {/* <MenuItem icon={<FiHome/>}>
                  <NavLink to='/' exact={true} active={true} activeClassName='active'>Home</NavLink>
                </MenuItem> */}
                
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
                <MenuItem icon={<FiUsers/>}>
                  <NavLink to='/users' exact={true} activeClassName='active'>Browse</NavLink>
                </MenuItem>
                <MenuItem icon={<FiHeart/>}>
                  <NavLink to='/matches' exact={true} activeClassName='active'>Matches</NavLink>
                </MenuItem>
                <MenuItem icon={<FiThumbsUp/>}>
                  <NavLink to='likes/profile' exact={true} activeClassName='active'>Likes</NavLink>
                </MenuItem>
                {user?.matches[0] ?
                  user.matches?.map((match) => (
                    match.matched.map((matchedUser) => {
                      return (matchedUser.id !== user.id && (
                    <MenuItem className='matchedUserIconContainer'icon={matchedUser?.images ? <img src={matchedUser?.images[0]?.userImage} className='sidebarMatchedUserIcon' alt=''/> : <img src='https://cdn-icons-png.flaticon.com/512/616/616408.png' className='sidebarMatchedUserIcon' alt=''/>}>
                       <NavLink to={`/matches/${match.id}`} exact={true} className='sidebarMatchUsername' activeClassName='active'>{matchedUser?.name}</NavLink>
                    </MenuItem>

                    ))}))) : null}
                
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
