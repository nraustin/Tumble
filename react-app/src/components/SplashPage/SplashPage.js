import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { NavLink, useHistory} from 'react-router-dom';
import * as profileActions from '../../store/profile'
import LoginForm from '../auth/LoginForm';
import SignUpForm from '../auth/SignUpForm';

import './SplashPage.css'
import tumble from './tumble.png'



const SplashPage = () => {


    const [loginClick, setLoginClick] = useState(false)
    const [signUpClick, setSignUpClick] = useState(false)
    const [dogClick, setDogClick] = useState(false)
    const [personClick, setPersonClick] = useState(false)

    const user = useSelector(state => state.session.user)

    const handleLogin = (e) => {
        e.preventDefault()
        setSignUpClick(false)
        setLoginClick(true)
    }

    const handleSignUp = (e) => {
        e.preventDefault()
        setLoginClick(false)
        setSignUpClick(true)
    }

    return(
        <>
        {!user && (
        <body className='splashBody'>
        <img className='tumbleSplashLogo' src={tumble}/>
        <h4 className='tumbleIntroText'>Meet your match.</h4>
        <div className='splashContainer'>
        {!loginClick && !signUpClick && (
            <div className='splashButtonsContainer'>
                <button className='splashButtonLogin' onClick={handleLogin}>Log in</button>
                <button className='splashButtonSignUp' onClick={handleSignUp}>Sign Up</button>
                <button className='splashButtonDog' onClick={() => setDogClick(true)}>Dog Demo</button>
                <button className='splashButtonPerson' onClick={() => setPersonClick(true)}>Person Demo</button>
            </div>)}
            
            {loginClick && (
            <>
            <LoginForm/>
            </>)}
            {signUpClick && (
            <>
            <SignUpForm/>
            </>
            )}
        
        </div>
        <img className='splashDog' src='https://www.pngkit.com/png/full/2-22172_dog-png-white-dog-silhouette.png'/>
        </body>)}
        </>
    )
}

export default SplashPage;