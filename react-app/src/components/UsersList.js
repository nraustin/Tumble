import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

function UsersList() {
  
  const [users, setUsers] = useState([]);
  const [imageURL, setImageURL] = useState('')

  const user = useSelector(state => state.session.user)

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  const handleImageSubmit = async(e) => {
    e.preventDefault();
    const image = { imageURL, user_id: user.id}

    const res = await fetch('/api/users', {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(image)
    })

    const newImage = await res.json()


  const userComponents = users.map((user) => {
    return (
      <li key={user.id}>
        <NavLink to={`/users/${user.id}`}>{user.username}</NavLink>
      </li>
    );
  });

  return (
    <>
      <h1>User List: </h1>
      <ul>{userComponents}</ul>
      <form onSubmit={handleImageSubmit}>
        <div>
          <label>Profile Images</label>
          <input 
            value={imageURL}
            type='text'
            onChange={(e) => setImageURL(e.target.value)}
          ></input>
        </div>
        <button type='Submit'>Submit</button>
      </form>
     </>
  )}
  }

export default UsersList;
