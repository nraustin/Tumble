import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import * as profileActions from '../../store/profile'
import * as sessionActions from '../../store/session'

import './ProfilePage.css'

import { FiUpload, FiXCircle, FiX } from "react-icons/fi";
import { BsFillPencilFill } from 'react-icons/bs'
import {HiCheck } from 'react-icons/hi'
import cameraIcon from './tumbleUploadPhotoIcon.png'
import { useHistory } from 'react-router-dom';

const ProfilePage = () => {

    const dispatch = useDispatch()

    const history = useHistory()
    

    const user = useSelector(state => state.session.user)
    const profileObj = useSelector(state => state.profile)
    const profile = Object.values(profileObj)[0]

    console.log(profile)

    const [errors, setErrors] = useState([]);


    const [image, setImage] = useState(null)
    const [imageLoading, setImageLoading] = useState(false)
    const [addPhoto, setAddPhoto] = useState(false)
  
    const [editBio, setEditBio] = useState(false)
    const [editLocation, setEditLocation] = useState(false)
    // const [editDog, setEditDog] = useState(false)

    // const [newInfo, setNewInfo] = useState('')

    const [biography, setBio] = useState(user.biography)
    const [location, setLocation] = useState(user?.location)
    const [dog] = useState(user?.dog)


    useEffect(() => {
       dispatch(profileActions.getUserThunk(user.id))
       
    }, [dispatch, user?.id])



    const handleImageDelete = async(e) => {
      
      e.preventDefault();

      const deletedPhoto = { imageId: e.currentTarget.id }
      console.log(deletedPhoto)

      dispatch(sessionActions.deleteImageThunk(deletedPhoto))
      dispatch(profileActions.getUserThunk(user.id))
      window.location.reload(false);
      history.push('/users/profile')
      
    }


    const handleImageSubmit = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image)
        formData.append("user_id", user?.id)

    
        setImageLoading(true)

       
    
        const res = await fetch(`/api/users/${user.id}`, {
          method: "POST",
          body: formData
        })

          if(res.ok){
          setImageLoading(false);
          dispatch(sessionActions.addImageThunk(formData, res))
          dispatch(profileActions.getUserThunk(user.id))
          window.location.reload(false);
          setAddPhoto(false)

        }
        history.push('/users/profile')

        console.log(res)

        
    
        // else {
        //   setImageLoading(false)
        //   console.log("error")
        // }
      }
    
        const update = (e) => {
          const file = e.target.files[0];
          setImage(file)
          setAddPhoto(true)
        }

        
        const userId = user?.id
        

        const handleProfileEdit = async(e) => {
          e.preventDefault()

          // const editedUser = { userId: user?.id, bio: biography, dog: dog, location: location}
          // const editedUserForm = new FormData();
          // editedUserForm.append("userId", user?.id)
          // editedUserForm.append("bio", user?.biography)
          // editedUserForm.append("dog", user?.dog)
          // editedUserForm.append("location", user?.location)

          

          const data = await dispatch(sessionActions.editUserThunk(userId, biography, dog, location))
          if(data){
            setErrors(data)
          }

          // dispatch(profileActions.getUserThunk(user?.id))

          setEditBio(false)
          setEditLocation(false)

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
              
                        
                        <div className='profilePageImg'>

                          
                          <img className='displayedImg' src={image.userImage} alt=''/>
                          <div className='ImgDeleteContainer' onClick={handleImageDelete} id={image.id}>
                            <FiXCircle/>
                          </div>
                        </div>
                        
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
                           <label htmlFor='picInput' className='picInputButton'><FiUpload/></label>
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
                   <div className='profileGap'>
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
                    <div className='updatableProfileInfoContainer'>
                    {!editBio ? 
                        <>
                        <div className='profileInfoBio'>
                          Biography: {user.biography ? user.biography : 'Tell everyone about yourself'} 
                          
                          </div>
                          <div className='editProfileIcon' onClick={() => setEditBio(true)}><BsFillPencilFill/></div>
                          </>
                          :
                          <div className='editProfileInfoBio'>
                              <form onSubmit={handleProfileEdit} className='editBioForm'>
                              <div>
                                  {errors.map((error, ind) => (
                                    <div key={ind}>{error}</div>
                                  ))}
                                </div>
                                <textarea className="editBioTextArea"
                                value={biography}
                                onChange={(e) => setBio(e.target.value)}
                                required
                                >{user?.biography}</textarea>
                                <div className="editBioButtons">
                                    <button type='Submit' className="editMsgSubmitButton"><HiCheck/></button>
                                    <button className="cancelEditMsgButton" onClick={() => setEditBio(false)}><FiX/></button>
                                  </div>
                                </form>
                            </div> }
                          </div>
                      <div className='updatableProfileInfoContainer'>
                      {!editLocation ? 
                        <>
                        <div className='profileInfo'>
                          Location: {user.location ? user.location : 'Add your location'} <div className='editProfileIcon'></div>
                          </div> 
                        
                          <div className='editProfileIcon' onClick={() => setEditLocation(true)}><BsFillPencilFill/></div>
                          </> : 
                          <div className='editProfileInfoBio'>
                          <form onSubmit={handleProfileEdit} className='editBioForm'>
                          <div>
                              {errors.map((error, ind) => (
                                <div key={ind}>{error}</div>
                              ))}
                            </div>
                            <textarea className="editBioTextArea"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                            >{user?.biography}</textarea>
                            <div className="editBioButtons">
                                <button type='Submit' className="editMsgSubmitButton"><HiCheck/></button>
                                <button className="cancelEditMsgButton" onClick={() => setEditLocation(false)}><FiX/></button>
                              </div>
                            </form>
                        </div> }
                      </div>

                    <div className='profileInfo'>
                      Age: {user.age} <div className='editProfileIcon'></div>
                      </div> 
                    
                  </div>
                
              </div>
            </>
    );
  }
  
export default ProfilePage;