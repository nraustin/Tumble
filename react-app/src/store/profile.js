import { createElement } from "react";

const GET_USER = 'profile/GET_USER';
const GET_USERS = 'profile/GET_USERS';
const UPDATE_USER = 'profile/UPDATE_USER'
// const DEACTIVATE_USER = 'profile/DEACTIVATE_USER'

const getUser = (user) => ({
    type: GET_USER,
    payload: user
  })
  
const getUsers = (users) => ({
    type: GET_USERS,
    payload: users
  })

const updateUser = (user) => ({
    type: UPDATE_USER,
    payload: user
})


export const getUserThunk = (userId) => async(dispatch) => {

    const res = await fetch(`/api/users/${userId}`);

    if (res.ok) {
        const user = await res.json()
        dispatch(getUser(user))
    }
}

export const getUsersThunk = () => async(dispatch) => {

    const res = await fetch('/api/users')

    if (res.ok) {
        const users = await res.json()
        dispatch(getUsers(users))
    }
}

export const updateUserThunk = (user) => async(dispatch) => {
    
    const res =  await fetch(`/api/users/edit`, {
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(user)
    })

    if (res.ok) {
        const updatedUser = await res.json()
        dispatch(updateUser(updatedUser))
    }

}


const CREATE_LIKE = 'profile/CREATE_LIKE'
const GET_LIKES = 'profile/GET_LIKE'

const createLike = (like) => ({
    type: CREATE_LIKE,
    payload: like
})

const getLikes = (likes) => ({
    type: GET_LIKES,
    payload: likes
})

export const createLikeThunk = (like) => async(dispatch) => {

    const res = await fetch('api/likes/create', {
        method: 'POST',
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(like)
    })

    if (res.ok) {
        const newLike = await res.json()
        dispatch(createLike(newLike))
    }
}


export const getLikesThunk = () => async(dispatch) => {

    const res = await fetch('api/likes')

    if (res.ok) {
       const likes = await res.json()
       dispatch(getLikes(likes))
    }
}



let initialState = {}

 const profileReducer = (state = initialState, action) => {
    
        let newState;
      switch(action.type) {
          case GET_USER:
              let thisState = {};
              thisState[action.payload.id] = action.payload
              return thisState
          case GET_USERS:
              newState = {...state};
              action.payload.users?.forEach((user) => newState[user.id] = user)
              return newState;
          case UPDATE_USER:
              newState = {...state}
              newState[action.payload.id] = action.payload
              return newState
            default:
                return state;
      }
  }

  export default profileReducer