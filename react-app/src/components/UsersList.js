import React, { useEffect, useState } from 'react';
// import { useSelector} from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';

function UsersList() {
  
  const [users, setUsers] = useState([]);
  // const [image, setImage] = useState(null)
  // const [imageLoading, setImageLoading] = useState(false)
  
  const history = useHistory()

  // const user = useSelector(state => state.session.user)

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []); 

  // const handleImageSubmit = async(e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append("image", image)
  //   formData.append("user_id", user.id)
  //   // const new_image = { image, user_id: user.id }

  //   setImageLoading(true)

  //   const res = await fetch('/api/users/', {
  //     method: "POST",
  //     body: formData
  //   })

  //   if (res.ok) {
  //     await res.json();
  //     setImageLoading(false);
  //     history.push('/')
  //   }

  //   else {
  //     setImageLoading(false)
  //     console.log("error")
  //   }
  // }

  //   const update = (e) => {
  //     const file = e.target.files[0];
  //     setImage(file)
  //   }



  const userComponents = users?.map((user) => {
    return (
      <li key={user.id}>
        <NavLink to={`/users/${user?.id}`}>{user.name}</NavLink>
      </li>
    );
  });

  return (
    <>
      <h1>Swipe right to like, left to move on</h1>
      <ul>{userComponents}</ul>
      {/* <form onSubmit={handleImageSubmit}>
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
      </form> */}
     </>
  )

}

export default UsersList;
