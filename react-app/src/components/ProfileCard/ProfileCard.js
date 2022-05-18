import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as profileActions from '../../store/profile'
import * as sessionActions from '../../store/session'


import {FiHeart, FiMeh} from 'react-icons/fi'

import './ProfileCard.css'


function ProfileCard({...allProfProps}) {
  const [user, setUser] = useState({});
  const { userId }  = useParams();
  const dispatch = useDispatch()

  const userS = useSelector(state => state.session.user)

  console.log(allProfProps?.slideIndex)

  useEffect(() => {
    dispatch(profileActions.getUserThunk(userS?.id))
  }, [dispatch])

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

  

  const likePersonUser = async(e) => {
    e.preventDefault()
   
    const newLike = { userId: userS.id, profileId: allProfProps.person?.id }
    dispatch(sessionActions.createLikeThunk(newLike))
    dispatch(sessionActions.getMatchesThunk())
     

    if(allProfProps?.slideIndex !== allProfProps?.peopleProfiles.length){
      allProfProps?.setSlideIndex(allProfProps?.slideIndex + 1)
      allProfProps?.setProfileIndex(allProfProps?.profileIndex + 1)
    } else if (allProfProps?.slideIndex === allProfProps?.peopleProfiles.length){
      allProfProps?.setSlideIndex(1)
      allProfProps?.setProfileIndex(0)
    }

  }

  const likeDogUser = e => {
    e.preventDefault()
   
    const newLike = { userId: userS.id, profileId: allProfProps.dog?.id }
    dispatch(sessionActions.createLikeThunk(newLike))

      if(allProfProps?.slideIndex !== allProfProps?.dogProfiles.length){
        allProfProps?.setSlideIndex(allProfProps?.slideIndex + 1)
        allProfProps?.setProfileIndex(allProfProps?.profileIndex + 1)
      } else if (allProfProps?.slideIndex === allProfProps?.dogProfiles.length){
        allProfProps?.setSlideIndex(1)
        allProfProps?.setProfileIndex(0)
      }

  }

  const noThanksPerson = e => {
    e.preventDefault()

    const newUnlike = { userId: userS.id, profileId: allProfProps.person?.id }
    dispatch(sessionActions.createUnlikeThunk(newUnlike))

    if(allProfProps?.slideIndex !== allProfProps?.peopleProfiles.length){
      allProfProps?.setSlideIndex(allProfProps?.slideIndex + 1)
      allProfProps?.setProfileIndex(allProfProps?.profileIndex + 1)
    } else if (allProfProps?.slideIndex === allProfProps?.peopleProfiles.length){
      allProfProps?.setSlideIndex(1)
      allProfProps?.setProfileIndex(0)
    }
  }

  const noThanksDog = e => {
    e.preventDefault()

    const newUnlike = { userId: userS.id, profileId: allProfProps.dog?.id }
    dispatch(sessionActions.createUnlikeThunk(newUnlike))

    if(allProfProps?.slideIndex !== allProfProps?.dogProfiles.length){
      allProfProps?.setSlideIndex(allProfProps?.slideIndex + 1)
      allProfProps?.setProfileIndex(allProfProps?.profileIndex + 1)
    } else if (allProfProps?.slideIndex === allProfProps?.dogProfiles.length){
      allProfProps?.setSlideIndex(1)
      allProfProps?.setProfileIndex(0)
    }
  }


  return (
      <>
        {userS && userS.dog === true ?
            <div className='swipeCardContainer'>
            
            <div className='swipeCardProfilePicsContainer'>
              {allProfProps.person?.images ? <img className='swipeCardProfilePics' src={allProfProps.person.images[0]?.userImage} alt='https://cdn-icons-png.flaticon.com/512/616/616408.png'/>
                : <img src='https://cdn-icons-png.flaticon.com/512/616/616408.png' alt=''/>}
                </div>
                <div className='swipeCardInfoContainer'>
                  <strong className='swipeCardGeneralInfo'>
                    <div>{allProfProps.person?.name}, {allProfProps.person?.age}</div>
                    <div>{allProfProps.person?.location}</div>
                  </strong>
                  <strong className='swipeCardBio'>{allProfProps.person?.biography}</strong>
                  <div className="likeButtons">
                    <button onClick={likePersonUser} className='swipeCardLikeButton'><FiHeart/></button>
                    <button onClick={noThanksPerson} className='swipeCardUnlikeButton'><FiMeh/></button>
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
                  <div>{allProfProps.dog?.name}, {allProfProps.dog?.age}</div>
                  <div>{allProfProps.dog?.location}</div>
                </strong>
                <strong className='swipeCardBio'>{allProfProps.dog?.biography}</strong>
                <div className="likeButtons">
                  <button onClick={likeDogUser} className='swipeCardLikeButton'><FiHeart/></button>
                  <button onClick={noThanksDog} className='swipeCardUnlikeButton'><FiMeh/></button>
                </div>
            </div>
          </div> }
      </>
  );
}

export default ProfileCard;