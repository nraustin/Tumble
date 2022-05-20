import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
import * as profileActions from '../../store/profile'
import * as sessionActions from '../../store/session'


import {FiHeart, FiMeh} from 'react-icons/fi'

import './ProfileCard.css'
import doge from './endDeckFinalIcon.png'


function ProfileCard({...allProfProps}) {
  // const [user, setUser] = useState({});
  // const { userId }  = useParams();
  const dispatch = useDispatch()

  const userS = useSelector(state => state.session.user)

  console.log(allProfProps?.slideIndex)
  console.log(allProfProps?.person)
  console.log(allProfProps?.dog)

  console.log(allProfProps?.dog)

  // useEffect(() => {
  //   dispatch(profileActions.getUserThunk(userS?.id))
  // }, [dispatch, userS?.id])

  // useEffect(() => {
  //   if (!userId) {
  //     return;
  //   }
  //   (async () => {
  //     const response = await fetch(`/api/users/${userId}`);
  //     const user = await response.json();
  //     setUser(user);
  //   })();
  // }, [userId]);

  // if (!user) {
  //   return null;
  // }

  
  

  const likePersonUser = async(e) => {
    e.preventDefault()
   
    const newLike = { userId: userS.id, profileId: allProfProps.person?.id }
    dispatch(sessionActions.createLikeThunk(newLike)).then(() => dispatch(sessionActions.getMatchesThunk()))
    dispatch(profileActions.delUserProfileThunk(allProfProps.person?.id))

     

    if(allProfProps?.slideIndex !== allProfProps?.peopleProfiles.length){
      allProfProps?.setSlideIndex(allProfProps?.slideIndex)
      allProfProps?.setProfileIndex(allProfProps?.profileIndex)
    } else if (allProfProps?.slideIndex === allProfProps?.peopleProfiles.length){
      allProfProps?.setSlideIndex(1)
      allProfProps?.setProfileIndex(0)
    }

  }

  const likeDogUser = e => {
    e.preventDefault()
   
    const newLike = { userId: userS.id, profileId: allProfProps.dog?.id }
    dispatch(sessionActions.createLikeThunk(newLike)).then(() => dispatch(sessionActions.getMatchesThunk()))
    dispatch(profileActions.delUserProfileThunk(allProfProps.dog?.id))

      if(allProfProps?.slideIndex !== allProfProps?.dogProfiles.length){
        allProfProps?.setSlideIndex(allProfProps?.slideIndex)
        allProfProps?.setProfileIndex(allProfProps?.profileIndex)
      } else if (allProfProps?.slideIndex === allProfProps?.dogProfiles.length){
        allProfProps?.setSlideIndex(1)
        allProfProps?.setProfileIndex(0)
      }

  }

  const noThanksPerson = e => {
    e.preventDefault()

    const newUnlike = { userId: userS.id, profileId: allProfProps.person?.id }
    dispatch(sessionActions.createUnlikeThunk(newUnlike)).then(() => dispatch(sessionActions.getMatchesThunk()))
    dispatch(profileActions.delUserProfileThunk(allProfProps.person?.id))

    if(allProfProps?.slideIndex !== allProfProps?.peopleProfiles.length){
      allProfProps?.setSlideIndex(allProfProps?.slideIndex)
      allProfProps?.setProfileIndex(allProfProps?.profileIndex)
    } else if (allProfProps?.slideIndex === allProfProps?.peopleProfiles.length){
      allProfProps?.setSlideIndex(1)
      allProfProps?.setProfileIndex(0)
    }
  }

  const noThanksDog = e => {
    e.preventDefault()

    const newUnlike = { userId: userS.id, profileId: allProfProps.dog?.id }
    dispatch(sessionActions.createUnlikeThunk(newUnlike)).then(() => dispatch(sessionActions.getMatchesThunk()))
    dispatch(profileActions.delUserProfileThunk(allProfProps.dog?.id))

    if(allProfProps?.slideIndex !== allProfProps?.dogProfiles.length){
      allProfProps?.setSlideIndex(allProfProps?.slideIndex)
      allProfProps?.setProfileIndex(allProfProps?.profileIndex)
    } else if (allProfProps?.slideIndex === allProfProps?.dogProfiles.length){
      allProfProps?.setSlideIndex(1)
      allProfProps?.setProfileIndex(0)
    }
  }

  console.log(allProfProps?.peopleProfiles)


  return (
      <>
        {userS && userS.dog === true ?
            (allProfProps?.person ? 
            <div className='swipeCardContainer'>

            <div className='swipeCardProfilePicsContainer'>
              {allProfProps.person?.images.length > 0 ? <img className='swipeCardProfilePics' src={allProfProps.person.images[0]?.userImage} alt={''}/>
                : <img src={process.env.PUBLIC_URL + '/tumbleDefaultIcon.png'} alt="logo" />} 
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
              </div> : 
              <div className='endOfProfileCardDeckContainer'>
                <div className='endDeckInfo'>
                  <h2>Looks like you've seen all the aspiring future dog owners there are to see- for now.</h2>
                  <div className='dogeImgContainer'>
                    <img className='dogeImg' src={doge} alt=''/>
                  </div>
                  <h4>Check back again soon for new users. Once they sign up, you'll see them right here.</h4>
                </div>
              </div>)
            :
            (allProfProps?.dog ? 
            <div className='swipeCardContainer'>
            
            <div className='swipeCardProfilePicsContainer'>
              {allProfProps.dog?.images.length > 0 ? <img className='swipeCardProfilePics' src={allProfProps.dog?.images[0]?.userImage} alt={''}/>
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
              </div> :
                <div className='endOfProfileCardDeckContainer'>
                  <div className='endDeckInfo'>
                    <h2>Looks like you've seen all the dogs there are to see- for now.</h2>
                    <img className='dogeImg' alt=''/>
                    <h4>Check back again soon for new ones. Once they sign up, you'll see them right here.</h4>
                  </div>
                </div> )
           }
      </>
  );
}

export default ProfileCard;