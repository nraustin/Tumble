import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';
import ProfilePage from './components/ProfilePage/ProfilePage';
import ProfileCard from './components/ProfileCard/ProfileCard';
import ProfileCardSlider from './components/ProfileCardSlider/ProfileCardSlider';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();


  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <div className='App'>
      <BrowserRouter>
        <NavBar/>
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <Route path='/users' exact={true} >
          <ProfileCardSlider/>
        </Route>
        <ProtectedRoute path='/users/profile' exact={true} >
          <ProfilePage />
        </ProtectedRoute>
        <Route path='/users/:userId' exact={true} >
          <ProfileCard />
        </Route>
        <ProtectedRoute path='/' exact={true} >
        </ProtectedRoute>
        </Switch>
        </BrowserRouter>
      </div>
  );
}

export default App;
