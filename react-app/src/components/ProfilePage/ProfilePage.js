import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import * as profileActions from '../../store/profile'

import './ProfilePage.css'

import { FiUpload} from "react-icons/fi";
import cameraIcon from './tumbleUploadPhotoIcon.png'

const ProfilePage = () => {

    const dispatch = useDispatch()
    

    const user = useSelector(state => state.session.user)
    const profileObj = useSelector(state => state.profile)
    const profile = Object.values(profileObj)[0]

    console.log(profile)


    const [image, setImage] = useState(null)
    const [imageLoading, setImageLoading] = useState(false)
    const [addPhoto, setAddPhoto] = useState(false)
  


    useEffect(() => {
       dispatch(profileActions.getUserThunk(user.id))
       
    }, [dispatch, user?.id])

    
  

    const handleImageSubmit = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image)
        formData.append("user_id", user.id)

        
    
        setImageLoading(true)
    
        const res = await fetch(`/api/users/${user.id}`, {
          method: "POST",
          body: formData
        })
    
        if (res.ok) {
          await res.json();
          setImageLoading(false);
          dispatch(profileActions.getUserThunk(user.id))
          window.location.reload(false);
        }
    
        else {
          setImageLoading(false)
          console.log("error")
        }
      }
    
        const update = (e) => {
          const file = e.target.files[0];
          setImage(file)
          setAddPhoto(true)
        }
    
    return (
          <>
          
            <div className='profileContainerRoot'>
            
                  <div className='profilePicContainer'>
                     
                     <div className='profileImageGrid'>
                     {user.images?.length > 0 ? 
                       user.images?.map((image) => {
                        return (
                        <>
                        <img className='profilePageImg' src={image.userImage} alt=''/>
                        
                        </>
                        )}) : null }
                        <div className='profilePageImgBlank'>
                          {user.images?.length === 0 ?
                          <h4 className='uploadInstructText'>Upload profile photos from your computer below</h4> : <img className='cameraIcon' src={cameraIcon} alt=''/> }
                        </div>
                        <div className='profilePageImgBlank'>
                          <img className='cameraIcon' src={cameraIcon} alt=''/>
                        </div>
                        <div className='profilePageImgBlank'>
                          <img className='cameraIcon' src={cameraIcon} alt=''/>
                        </div>
                        <div className='profilePageImgBlank'>
                          <img className='cameraIcon' src={cameraIcon} alt=''/>
                        </div>
                        <div className='profilePageImgBlank'>
                          <img className='cameraIcon' src={cameraIcon} alt=''/>
                        </div>
                        <div className='profilePageImgBlank'>
                          <img className='cameraIcon' src={cameraIcon} alt=''/>
                        </div>
                        
                      </div>
                      {user?.images?.length < 6 ? 
                   <form onSubmit={handleImageSubmit} className='imageSubmitForm'>
                          <div className='uploadPicContainer'>
                           <label for='picInput' className='picInputButton'><FiUpload/></label>
                           <input
                           type="file"
                           id='picInput'
                           accept="image/*"
                           onChange={update}
                           
                           />
                           </div>
                      {addPhoto && ( 
                     <div className='submitPicContainer'>
                     <button type='Submit' className='submitProfileImgButton'>Add Photo</button>
                     </div> )}
                     {(imageLoading)&& <p>Patience, bro</p>}
                   </form> :
                    <>
                      <p className='maxPhotosText'>Replace one of your current photos to add more.</p>
                    </> }
                   </div> 
                  <div className='profileContainer'>
                  <h2 className='profileText'>My Profile</h2>
                  
                    <div className='profileInfo'>
                      Name: {user.name} <div className='editProfileIcon'></div>
                      </div> 
                    <div className='profileInfo'>
                      Email: {user.email} <div className='editProfileIcon'></div>
                      </div> 
                    <div className='profileInfo'> 
                      I'm looking for: {user.dog? 'a new owner' : 'a new dog'} <div className='editProfileIcon'></div>
                      </div> 
                    <div className='profileInfo'>
                      Biography: {user.biography ? user.biography : 'Tell everyone about yourself'} <div className='editProfileIcon'></div>
                      </div>
                    <div className='profileInfo'>
                      Location: {user.location ? user.location : 'Add your location'} <div className='editProfileIcon'></div>
                      </div> 
                    <div className='profileInfo'>
                      Age: {user.age} <div className='editProfileIcon'></div>
                      </div> 
                    <div className='profileInfo'>
                      Likes: {user.likes[0] ? user.likes.length : null}
                      </div> 
                    
                  </div>
                
              </div>
            </>
    );
  }
  
export default ProfilePage;