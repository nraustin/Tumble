import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';
import ProfilePage from './components/ProfilePage/ProfilePage';
import ProfileCard from './components/ProfileCard/ProfileCard';
import ProfileCardSlider from './components/ProfileCardSlider/ProfileCardSlider';
import UserMatches from './components/UserMatches/UserMatches';
import MatchRoom from './components/MatchRoom/MatchRoom';
import SplashPage from './components/SplashPage/SplashPage';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user)


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
    <>
    <div className='App'>
      <BrowserRouter>
         {loaded && user ? 
        <NavBar/> :
        <Route path='/' exact={true} >
          <SplashPage/>
        </Route>}
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/matches' exact={true}>
          <UserMatches/>
        </ProtectedRoute>
        <ProtectedRoute path='/matches/:matchId' exact={true}>
          <MatchRoom/>
        </ProtectedRoute>
        <ProtectedRoute path='/users' exact={true} >
          <ProfileCardSlider/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/profile' exact={true} >
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <ProfileCard />
        </ProtectedRoute>
        <Route path='/' exact={true} >
        </Route>
      </Switch>
        </BrowserRouter>
        </div>
      </>
      );
}

export default App;
