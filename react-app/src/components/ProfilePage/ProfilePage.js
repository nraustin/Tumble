import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory, useParams} from 'react-router-dom';


const ProfilePage = () => {
    
    const [profilePhoto, setProfilePhoto] = useState('')
    const [bio, setBio] = useState('')
    const [age, setAge] = useState(0)
    const [location, setLocation] = useState('')

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
        const user = await response.json()
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
    
        const res = await fetch('/api/users/', {
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
                <ul>
                    <strong>User Id</strong> {user.id}
                    <strong>Username</strong> {user.name}
                    <strong>Email</strong> {user.email}
                </ul>
                <ul>
                    <strong>Biography</strong> {user.biography}
                    <strong>Location</strong> {user.location}
                    <strong>Age</strong> {user.age}
                </ul>
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
            </>
    );
  }
  
export default ProfilePage;