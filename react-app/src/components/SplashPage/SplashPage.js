import React, { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux'
// import { useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session'
import LoginForm from '../auth/LoginForm';
import SignUpForm from '../auth/SignUpForm';

import './SplashPage.css'
import tumble from './tumble-white-smooth.png'



const SplashPage = () => {

    const dispatch = useDispatch()

    // const history = useHistory()

    const [loginClick, setLoginClick] = useState(false)
    const [signUpClick, setSignUpClick] = useState(false)

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

    const handleDogLogin = (e) => {
        e.preventDefault()
        const email = "spot@aa.io"
        const password = "password" 
        return dispatch(sessionActions.login(email, password))
        // history.push('/users/profile')
    }

    const handlePersonLogin = (e) => {
        e.preventDefault()
        const email = "demo@aa.io"
        const password = "password" 
        return dispatch(sessionActions.login(email, password))
    }

   

    function reverseArr(arr) {
        
        
        for (let i = 0; i < arr.length; i++){
            arr[i].reverse()
        }
        
        return arr
    }

    function reverseArr2(arr){
        
        let newArr = [];
        for (let i = 0; i < arr.length; i++){
            let innerArr = []
            innerArr.push(arr[i][1])
            innerArr.push(arr[i][0])
            newArr.push(innerArr)

                
            
        }

            return newArr
}

    let array = [[1,2],[3,4],[5,6]]
    let array2 = [[1,2],[3,4],[5,6]]

    console.log(reverseArr(array))
    console.log(reverseArr2(array2))


    return(
        <>
        {!user && (
        <body className='splashBody'>
        <img className='tumbleSplashLogo' src={tumble} alt=''/>
        <h4 className='tumbleIntroText'>Meet your match.</h4>
        <div className='splashContainer'>
        {!loginClick && !signUpClick && (
            <div className='splashButtonsContainer'>
                <button className='splashButtonLogin' onClick={handleLogin}>Log in</button>
                <button className='splashButtonSignUp' onClick={handleSignUp}>Sign Up</button>
                <button className='splashButtonDog' onClick={handleDogLogin}>Dog Demo</button>
                <button className='splashButtonPerson' onClick={handlePersonLogin}>Person Demo</button>
            </div>)}
            
            {loginClick && (
            <>
            <LoginForm signUpState={setSignUpClick}/>
            </>)}
            {signUpClick && (
            <>
            <SignUpForm/>
            </>
            )}
        
        </div>
        <img className='splashDog' src='https://www.pngkit.com/png/full/2-22172_dog-png-white-dog-silhouette.png' alt=''/>
        </body>)}
        </>
    )
}

export default SplashPage;