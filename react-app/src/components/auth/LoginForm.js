import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import SignUpForm from './SignUpForm';

import './LoginForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const history = useHistory();
  const [signUpForm, showSignUpForm] = useState(false)

  // const history = useHistory()

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  console.log(user)

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
    return <Redirect to='/users/profile'/>;
    // history.push('/users/profile')
  }

  return (
    <div className='loginFormContainer'>
    {!signUpForm ?
    <>
    <form onSubmit={onLogin} className='loginForm'>
      <div className='loginFormDiv'>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className='loginFormDiv'>
        <label htmlFor='email'>Email</label>
        <input
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div className='loginFormDiv'>
        <label htmlFor='password'>Password</label>
        <input
          name='password'
          type='password'
          placeholder='Password'
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
    : <SignUpForm/> }
    {/* {user !== null && (
      <>
      <Redirect to='/users/profile'/>
      </>
    )} */}
    </div>
  );
};

export default LoginForm;
