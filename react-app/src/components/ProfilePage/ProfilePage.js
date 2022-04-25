import React, { useState } from 'react';
import { useSelector} from 'react-redux'
import { useHistory} from 'react-router-dom';
import { FiEdit } from "react-icons/fi";

import './ProfilePage.css'


const ProfilePage = () => {

  
    
    // const [profilePhoto, setProfilePhoto] = useState('')
    // const [bio, setBio] = useState('')
    // const [age, setAge] = useState(0)
    // const [location, setLocation] = useState('')

    const user = useSelector(state => state.session.user)

    const history = useHistory()
    // const { userId }  = useParams();

    const [image, setImage] = useState(null)
    const [imageLoading, setImageLoading] = useState(false)
  
    // useEffect(() => {
    //   if (!userId) {
    //     return;
    //   }
    //   (async () => {
    //     const response = await fetch(`/api/users/${userId}`);
    //     const user = await response.json()
    //   })();
    // }, [userId]);
  
    // if (!user) {
    //   return null;
    // }

    const handleImageSubmit = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image)
        formData.append("user_id", user.id)
        // const new_image = { image, user_id: user.id }
    
        setImageLoading(true)
    
        const res = await fetch(`/api/users/${user.id}`, {
          method: "POST",
          body: formData
        })
    
        if (res.ok) {
          await res.json();
          setImageLoading(false);
          history.push('/')
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
                  <div>
                      Profile Pictures
                      <div className='profileImageGrid'>
                      {user.images[0] ? 
                        user.images?.map((image) => {
                         return (
                         <img className='profilePageImg' src={image.userImage} alt=''/>
                         )}) : null}
                       </div>
                    <form onSubmit={handleImageSubmit} className='imageSubmitForm'>
                      <div >
                          <input
                          type="file"
                          className='uploadProfileImgButton'
                          accept="image/*"
                          onChange={update}
                          />
                      </div>
                      <button type='Submit' className='submitProfileImgButton'>Add Profile Photo</button>
                      {(imageLoading)&& <p>Patience, bro</p>}
                    </form>
                    </div>
                    <div className='profileInfo'>
                      Name: {user.name} <div className='editProfileIcon'>{<FiEdit/>}</div>
                      </div> 
                    <div className='profileInfo'>
                      Email: {user.email} <div className='editProfileIcon'>{<FiEdit/>}</div>
                      </div> 
                    <div className='profileInfo'> 
                      I'm looking for: {user.dog? 'potential owners' : 'dogs'} <div className='editProfileIcon'>{<FiEdit/>}</div>
                      </div> 
                    <div className='profileInfo'>
                      Biography: {user.biography ? user.biography : 'Tell everyone about yourself'} <div className='editProfileIcon'>{<FiEdit/>}</div>
                      </div>
                    <div className='profileInfo'>
                      Location: {user.location ? user.location : 'Add your location'} <div className='editProfileIcon'>{<FiEdit/>}</div>
                      </div> 
                    <div className='profileInfo'>
                      Age: {user.age} <div className='editProfileIcon'>{<FiEdit/>}</div>
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