import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import LoginForm from './LoginForm';

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
    setDog(e.target.value)
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
    <>
    {!loginForm ?
    <form onSubmit={onSignUp}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label>Name</label>
        <input
          type='text'
          name='username'
          onChange={updateName}
          value={name}
          required={true}
        ></input>
      </div>
      <div>
        <label>Email</label>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
          required={true}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
          required={true}
        ></input>
      </div>
      <div>
        <label>Repeat Password</label>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <div>
        <label>Are you a Dog Owner?</label>
          <input
            type='checkbox'
            value={dog}
            onChange={updateDog}
          ></input>
        </div>
        <div>
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
        

      <button type='submit'>Sign Up</button>
      <button onClick={login}>Already have an account? Log In</button>
    </form> : <LoginForm/>}
    </>
  );
};

export default SignUpForm;
