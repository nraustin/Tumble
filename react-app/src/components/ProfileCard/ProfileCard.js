import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as profileActions from '../../store/profile'

import './ProfileCard.css'

function ProfileCard({...allProfProps}) {
  const [user, setUser] = useState({});
  const { userId }  = useParams();
  const dispatch = useDispatch()

  const userS = useSelector(state => state.session.user)

  console.log(allProfProps.dog?.id)

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

  

  const likePersonUser = e => {
    e.preventDefault()
   
    const newLike = { userId: userS.id, profileId: allProfProps.person?.id }
    dispatch(profileActions.createLikeThunk(newLike))

  }

  const likeDogUser = e => {
    e.preventDefault()
   
    const newLike = { userId: userS.id, profileId: allProfProps.dog?.id }
    dispatch(profileActions.createLikeThunk(newLike))

  }

  const noThanks = e => {
    e.preventDefault()
  }


  return (
      <>
        {userS && userS.dog === true ?
            <div className='swipeCardContainer'>
            
            <div className='swipeCardProfilePicsContainer'>
              {allProfProps.person?.images ? <img className='swipeCardProfilePics' src={allProfProps.person.images[0]?.userImage} alt='https://cdn-icons-png.flaticon.com/512/616/616408.png'/>
                : <img src='https://cdn-icons-png.flaticon.com/512/616/616408.png'/>}
                </div>
                <div className='swipeCardInfoContainer'>
                  <strong className='swipeCardGeneralInfo'>
                    <div>{allProfProps.person?.name}</div>
                    <div>Age {allProfProps.person?.age}</div>
                    <div>{allProfProps.person?.location}</div>
                  </strong>
                  <strong className='swipeCardBio'>{allProfProps.person?.biography}</strong>
                  <div className="likeButtons">
                    <button onClick={likePersonUser}>Like</button>
                    <button onClick={noThanks}>No Thanks</button>
                  </div>
                </div>
              </div>
            :
            <div className='swipeCardContainer'>
            
            <div className='swipeCardProfilePicsContainer'>
              {allProfProps.dog?.images ? <img className='swipeCardProfilePics' src={allProfProps.dog?.images[0]?.userImage} alt={''}/>
                : <img src={process.env.PUBLIC_URL + '/tumbleDefaultIcon.png'} alt="logo" />} 
            </div>
              <div className='swipeCardInfoContainer'>
                <strong className='swipeCardGeneralInfo'>
                  <div>{allProfProps.dog?.name}</div>
                  <div>Age {allProfProps.dog?.age}</div>
                  <div>{allProfProps.dog?.location}</div>
                </strong>
                <strong className='swipeCardBio'>{allProfProps.dog?.biography}</strong>
                <div className="likeButtons">
                  <button onClick={likeDogUser}>Like</button>
                  <button onClick={noThanks}>No Thanks</button>
                </div>
            </div>
          </div> }
      </>
  );
}

export default ProfileCard;