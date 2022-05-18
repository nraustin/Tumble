import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import * as profileActions from '../../store/profile'

import './ProfilePage.css'


const ProfilePage = () => {

    const dispatch = useDispatch()
    

    const user = useSelector(state => state.session.user)
    const profileObj = useSelector(state => state.profile)
    const profile = Object.values(profileObj)[0]

    console.log(profile)


    const [image, setImage] = useState(null)
    const [imageLoading, setImageLoading] = useState(false)
  


    useEffect(() => {
       dispatch(profileActions.getUserThunk(user.id))
       
    }, [dispatch, user.id])

    
  

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
        }
    
    return (
          <>
            <div className='profileContainerRoot'>
                  <div className='profileContainer'>
                  <div className='profilePicContainer'>
                      Profile Pictures
                      <div className='profileImageGrid'>
                      {user.images[0] ? 
                        user.images?.map((image) => {
                         return (
                         <img className='profilePageImg' src={image.userImage} alt=''/>
                         )}) : null}
                       </div>
                    <form onSubmit={handleImageSubmit} className='imageSubmitForm'>
                          <div className='uploadProfileImgButton'>
                              <label className='uploadProfileImgButtonLabel' for='picInput'>Upload Picture</label>
                            <input
                            type="file"
                            id='picInput'
                            accept="image/*"
                            onChange={update}
                            hidden
                            />
                          </div>
                      <button type='Submit' className='submitProfileImgButton'>Add Profile Photo</button>
                      {(imageLoading)&& <p>Patience, bro</p>}
                    </form>
                    </div>
                    <div className='profileInfo'>
                      Name: {user.name} <div className='editProfileIcon'></div>
                      </div> 
                    <div className='profileInfo'>
                      Email: {user.email} <div className='editProfileIcon'></div>
                      </div> 
                    <div className='profileInfo'> 
                      I'm looking for: {user.dog? 'potential owners' : 'dogs'} <div className='editProfileIcon'></div>
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