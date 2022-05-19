import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import LoginForm from './LoginForm';

import './SignUpForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dog, setDog] = useState(false)
  const [age, setAge] = useState(0)


  const [repeatPassword, setRepeatPassword] = useState('');
  const [loginForm, showLoginForm] = useState(false)


  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(name, email, password, dog, age));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateName = (e) => {
    setName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateDog = (e) => {
    setDog(true)
  }

  const updateAge = (e) => {
    setAge(e.target.value)
  }

  const login = () => {
    showLoginForm(true)
  }

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='signUpContainer'>
    {!loginForm ?
    <form onSubmit={onSignUp} className='signUpForm'>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className='signUpFormDiv'>
        <label>Name</label>
        <input
          type='text'
          name='username'
          onChange={updateName}
          value={name}
          required={true}
        ></input>
      </div>
      <div className='signUpFormDiv'>
        <label>Email</label>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
          required={true}
        ></input>
      </div>
      <div className='signUpFormDiv'>
        <label>Password</label>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
          required={true}
        ></input>
      </div>
      <div className='signUpFormDiv'>
        <label>Repeat Password</label>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <div className='signUpFormDiv'>
        <label>Are you a dog owner?</label>
        <div className='ageCheckbox'>
          <input
            type='checkbox'
            value={dog}
            onChange={updateDog}
          ></input>
          </div>
        </div>
        <div className='signUpFormDiv'>
        <label>Age</label>
          <input
            type='number'
            value={age}
            min='1'
            max='120'
            onChange={updateAge}
            required={true}
          ></input>
        </div>
        
      <div className='signUpFormButtons'>
        <button type='submit' className='signUpFormSignUpButton'>Sign Up</button>
        <button className='signUpFormLogInButton' onClick={login}>Already have an account? Log In</button>
      </div>
    </form> : <LoginForm/>}
    </div>
  );
};

export default SignUpForm;
