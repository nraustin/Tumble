import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as profileActions from '../../store/profile'

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
    {/* <div className='swipeCardContainer'> */}
      {userS && userS.dog === true?
          <>
          <strong>User Id</strong> {allProfProps.person?.id}
        
          <strong>Username</strong> {allProfProps.person?.name}
        
          <strong>Email</strong> {allProfProps.person?.email}

          <strong>Age</strong> {allProfProps.person?.age}
          <strong>About Me</strong> {allProfProps.person?.biography}
          <div className="likeButtons">
            <button onClick={likePersonUser}>Like</button>
            <button onClick={noThanks}>No Thanks</button>
          </div>
          <div className='swipeCardProfilePicsContainer'>
            {allProfProps.person?.images ? <img className='swipeCardProfilePics' src={allProfProps.person.images[0]?.userImage} alt='https://cdn-icons-png.flaticon.com/512/616/616408.png'/>
               : <img src='https://cdn-icons-png.flaticon.com/512/616/616408.png'/>} 
          </div>
          </>
          :
          <>
          <strong>User Id</strong> {allProfProps.dog?.id}
        
          <strong>Username</strong> {allProfProps.dog?.name}
        
          <strong>Email</strong> {allProfProps.dog?.email}

          <strong>Age</strong> {allProfProps.dog?.age}
          <strong>About Me</strong> {allProfProps.dog?.biography}
          <div className="likeButtons">
            <button onClick={likeDogUser}>Like</button>
            <button onClick={noThanks}>No Thanks</button>
          </div>
          <div className='swipeCardProfilePicsContainer'>
            {allProfProps.dog?.images ? <img className='swipeCardProfilePics' src={allProfProps.dog?.images[0]?.userImage} alt='https://cdn-icons-png.flaticon.com/512/616/616408.png'/>
               : <img src='https://cdn-icons-png.flaticon.com/512/616/616408.png'/>} 
          </div>
          </>}

          
 
    {/* </div> */}
    
    </>
  );
}
export default ProfileCard;