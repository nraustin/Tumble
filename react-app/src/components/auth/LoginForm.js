import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import SignUpForm from './SignUpForm';

import './LoginForm.css'

const LoginForm = ({signUpState}) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const history = useHistory();
  const [signUpForm, showSignUpForm] = useState(false)

  // const history = useHistory()

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  console.log(user)
  console.log(signUpState)

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const goBack = () => {
    showSignUpForm(true)
  }

  if (user) {
    return <Redirect to='/'/>;
  }

  return (
    (!signUpForm ?
    <div className='loginFormContainer'>
    
    <>
    <form onSubmit={onLogin} className='loginForm'>
      <div className='loginFormDiv'>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className='loginFormDiv'>
        <label htmlFor='email'>Email</label>
        <input id="authInput"
          name='email'
          type='text'
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div className='loginFormDiv'>
        <label htmlFor='password'>Password</label>
        <input id="authInput"
          name='password'
          type='password'
          value={password}
          onChange={updatePassword}
        />
        <div className='loginButtonContainer'>
          <button type='submit' className='loginButton'>Login</button>
        </div>
      </div>
    </form>
    <div className='loginFormSignUpButtonContainer'>
      <button onClick={goBack} className='loginFormSignUpButton'>Don't have an account? 
      Sign up!</button>
    </div>
    </>
    </div> : <SignUpForm/> )
  );
};

export default LoginForm;
