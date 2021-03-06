import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LogoutButton from './auth/LogoutButton';
import { logout } from '../store/session'
import { ProSidebar, Menu, MenuItem, SidebarHeader, SidebarFooter, SidebarContent} from "react-pro-sidebar"
import { FiLogIn, FiLogOut, FiHeart, FiUserPlus, FiUser, FiUsers, FiHelpCircle } from "react-icons/fi";

// import * as profileActions from '.././store/profile'
// import * as matchActions from '.././store/match'
// import * as sessionActions from '.././store/session'

import "react-pro-sidebar/dist/css/styles.css";
import './NavBar.css'
import tumbleDefaultUser from './tumbleDefaultUser.png'
import navBarDog from './defaultNavBarImg.png'

const NavBar = () => {

  const user = useSelector(state => state.session.user)
  // const profile = useSelector(state => state.profile)
  const dispatch = useDispatch()

  // console.log(profile?.matches)
 

  const [menuCollapse, setMenuCollapse] = useState(true)

  useEffect(() => {
    async function getData() {
    // dispatch(profileActions.getUserThunk(user.id))
    // // dispatch(sessionActions.getMatchesThunk())
    }
    getData()

  }, [dispatch, user?.matches?.matched])
  
  const history = useHistory()

  const onLogout = async (e) => {
    await dispatch(logout());
    history.push('/')
  }

  const menuClick = () => {
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true)
  }


  return (
      <>
        <div className="sidebar" onMouseEnter={menuClick} onMouseLeave={menuClick}>
          <ProSidebar collapsed={menuCollapse}>
            <SidebarHeader>
            {user ? 
            <div className='userBox'>
              {user.images[0] ? <img className='userIcon' src={user.images[0].userImage} alt=''/> : <img className= 'userIcon2' src={navBarDog} alt={navBarDog}/>}
              <div className='userText'>
                <p>{user?.name}</p>
              </div>
            </div>
            : null }
            <div className='closeMenu' >
            </div>
            </SidebarHeader>
            <SidebarContent>
              <Menu iconShape='circle'>
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
                <MenuItem icon={<FiHelpCircle/>}>
                  <NavLink to='/' exact={true} activeClassName='active'>Guide</NavLink>
                </MenuItem>
                {user?.matches?.length > 0 ?
                  user.matches?.map((match) => (
                    match?.matched?.map((matchedUser) => {
                      return (matchedUser?.id !== user?.id && (
                    <MenuItem className='matchedUserIconContainer'icon={matchedUser?.images.length > 0 ? <img className='sidebarMatchedUserIcon' src={matchedUser?.images[0]?.userImage}  alt={tumbleDefaultUser}/> : <img className='sidebarMatchedUserIcon' src={tumbleDefaultUser}  alt=''/>}>
                       <NavLink to={`/matches/${match?.id}`} exact={true} className='sidebarMatchUsername' activeClassName='active'>{matchedUser?.name}</NavLink>
                    </MenuItem>

                    ))}))) : null}
                
              </Menu>
            </SidebarContent>
            <SidebarFooter>
              <Menu iconShape='circle'>
                <MenuItem icon={<FiLogOut/>} onClick={onLogout}><LogoutButton /></MenuItem>
              </Menu>
            </SidebarFooter>
          </ProSidebar>
          {/* <div className='footer'>
            
          </div> */}
        </div>
      </>
  );
}

export default NavBar;
