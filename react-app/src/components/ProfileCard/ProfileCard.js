import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
// import * as profileActions from '../../store/profile'

function ProfileCard(profile) {
  const [user, setUser] = useState({});
  const { userId }  = useParams();
  // const dispatch = useDispatch()

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  // const handleLike = e => {
  //   e.preventDefault()
  //   const newLike = { userId, profileId: profile.profile.id}
  //   dispatch(profileActions.createLikeThunk(newLike))

  // }

  // const handleNoThanks = e => {

  // }

  return (
    <div className='swipeCardContainer'>
    
          <strong>User Id</strong> {profile.profile.id}
        
          <strong>Username</strong> {profile.profile.name}
        
          <strong>Email</strong> {profile.profile.email}

          <strong>Age</strong> {profile.profile.age}
          <div className='swipeCardProfilePicsContainer'>
            {profile.profile.images[0] ? <img className='swipeCardProfilePics' src={profile.profile.images[0].userImage} alt='https://www.pinclipart.com/picdir/middle/190-1902439_dog-daycare-twitter-round-logo-png-transparent-background.png'/>
               : null} 
          </div>

       
    </div>
  );
}
export default ProfileCard;