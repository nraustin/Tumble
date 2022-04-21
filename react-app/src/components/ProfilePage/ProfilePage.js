import React, { useEffect, useState } from 'react';
import { useSelector} from 'react-redux'
import { useHistory, useParams} from 'react-router-dom';

import './ProfilePage.css'


const ProfilePage = () => {

  
    
    // const [profilePhoto, setProfilePhoto] = useState('')
    // const [bio, setBio] = useState('')
    // const [age, setAge] = useState(0)
    // const [location, setLocation] = useState('')

    const user = useSelector(state => state.session.user)

    const history = useHistory()
    const { userId }  = useParams();

    const [image, setImage] = useState(null)
    const [imageLoading, setImageLoading] = useState(false)
  
    useEffect(() => {
      if (!userId) {
        return;
      }
      (async () => {
        const response = await fetch(`/api/users/${userId}`);
        // const user = await response.json()
      })();
    }, [userId]);
  
    if (!user) {
      return null;
    }

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
                    <strong>User Id</strong> {user.id}
                    <strong>Name</strong> {user.name}
                    <strong>Email</strong> {user.email}
                    <strong>Dog</strong> {user.dog}
                    <strong>Biography</strong> {user.biography ? user.biography : 'Tell everyone about yourself'}
                    <strong>Location</strong> {user.location ? user.location : 'Add your location'}
                    <strong>Age</strong> {user.age}
                    <strong>Likes</strong> {user.likes[0] ? user.likes[0].id : null}
                    <strong>Profile Pictures
                      {user.images[0] ? 
                        user.images?.map((image) => {
                         return (
                         <img className='profilePageImg' src={image.userImage}/>
                         )}) : null}
          
                    </strong>
                  </div>
                <form onSubmit={handleImageSubmit}>
                <div>
                    <label>Profile Images</label>
                    <input
                    type="file"
                    // directory=""
                    // webkitdirectory=""
                    accept="image/*"
                    onChange={update}
                    />
                </div>
                <button type='Submit'>Submit</button>
                {(imageLoading)&& <p>Patience, bro</p>}
                </form>
              </div>
            </>
    );
  }
  
export default ProfilePage;