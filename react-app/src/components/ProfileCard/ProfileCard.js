import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ProfileCard(profile) {
  const [user, setUser] = useState({});
  const { userId }  = useParams();

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

  return (
    <div className='swipeCardContainer'>
    
          <strong>User Id</strong> {profile.profile.id}
        
          <strong>Username</strong> {profile.profile.name}
        
          <strong>Email</strong> {profile.profile.email}

          <strong>Age</strong> {profile.profile.age}
          <div className='swipeCardProfilePicsContainer'>
            {profile.profile.images[0] ? <img className='swipeCardProfilePics' src={profile.profile.images[0].userImage}/> : null} 
          </div>
       
    </div>
  );
}
export default ProfileCard;