import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as profileActions from '../../store/profile'

function ProfileCard(currentProf) {
  const [user, setUser] = useState({});
  const { userId }  = useParams();
  const dispatch = useDispatch()

  const userS = useSelector(state => state.session.user)

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

  

  const likeUser = e => {
    e.preventDefault()
   
    const newLike = { userId: userS.id, profileId: currentProf.profile?.id }
    dispatch(profileActions.createLikeThunk(newLike))

  }

  const noThanks = e => {
    e.preventDefault()
  }

  console.log(currentProf)

  return (
    <>
    {/* <div className='swipeCardContainer'> */}
    
          <strong>User Id</strong> {currentProf.profile?.id}
        
          <strong>Username</strong> {currentProf.profile?.name}
        
          <strong>Email</strong> {currentProf.profile?.email}

          <strong>Age</strong> {currentProf.profile?.age}
          <strong>About Me</strong> {currentProf.profile?.biography}
          <div className="likeButtons">
            <button onClick={likeUser}>Like</button>
            <button onClick={noThanks}>No Thanks</button>
          </div>
          <div className='swipeCardProfilePicsContainer'>
            {currentProf.images ? <img className='swipeCardProfilePics' src={currentProf.images[0].userImage} alt='https://www.pinclipart.com/picdir/middle/190-1902439_dog-daycare-twitter-round-logo-png-transparent-background.png'/>
               : null} 
          </div>
          
 
    {/* </div> */}
    
    </>
  );
}
export default ProfileCard;