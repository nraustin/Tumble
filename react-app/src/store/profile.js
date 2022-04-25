

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

// ---------------------------------------------------------LIKES


const CREATE_LIKE = 'profile/CREATE_LIKE'
const GET_LIKES = 'profile/GET_LIKE'
const CREATE_UNLIKE = 'profile/CREATE_UNLIKE'

const createLike = (like) => ({
    type: CREATE_LIKE,
    payload: like
})

const createUnlike = (unlike) => ({
      type: CREATE_UNLIKE,
      payload: unlike
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
        dispatch(createLike)
        return newLike
    }
}


export const createUnlikeThunk = (unlike) => async(dispatch) => {

  const res = await fetch('/api/unlikes/create', {
      method: 'POST',
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify(unlike)
    })

    if (res.ok) {
        const newUnlike = await res.json()
        dispatch(createUnlike)
        return newUnlike
    }
}


export const getLikesThunk = () => async(dispatch) => {

    const res = await fetch('api/likes')

    if (res.ok) {
       const likes = await res.json()
       dispatch(getLikes)
       return likes
    }
}

// --------------------------------------------------------------MATCHES




// --------------------------------------------------------------MESSAGES

// const CREATE_MESSAGE = "messages/CREATE_MESSAGE";
// const EDIT_MESSAGE = "messages/EDIT_MESSAGE";
// const DELETE_MESSAGE = "messages/DELETE_MESSAGE";

// const createMessage = (match_id, message) => ({
//   type: CREATE_MESSAGE,
//   newMessage: message, match_id,
// });

// const editMessage = (message) => ({
//   type: EDIT_MESSAGE,
//   updatedMessage: message,
// });

// const deleteMessage = (match_id, message) => ({
//   type: DELETE_MESSAGE,
//   deletedMessage: message, match_id,
// });


export const createMessageThunk = (message) => async (dispatch) => {

    const res= await fetch('/api/messages/new', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });

    if (res.ok) {
      const newMessage = await res.json();
      
      return newMessage;

    } 
    
    else {
      const errors = await res.json();
      return errors;
    }
  };
  
export const editMessageThunk = (message) => async (dispatch) => {

    const res = await fetch('/api/messages/edit', {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });
  
    if (!res.ok) {
      return res.errors;
    }

    const updatedMessage = await res.json();
    // dispatch(editMessage(updatedMessage));
    return updatedMessage;
  };
  
export const deleteMessageThunk = (message) => async (dispatch) => {

    const res = await fetch(`/api/messages/delete`, {
      method: "DELETE",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(message)

    });
    if (res.ok) {
      const deletedMessage = await res.json();
      // dispatch(deleteMessage(match_id, deletedMessage));
      return deletedMessage;

    } else {
      const errors = await res.json();
      return errors;
    }
  };


let initialState = {}

 const profileReducer = (state = initialState, action) => {
    
        let newState;
      switch(action.type) {
          case GET_USER:
              let thisState = {...state};
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
          case CREATE_LIKE:
               newState = {...state}
               newState[action.payload.id] = action.payload
               return newState
          case CREATE_UNLIKE:
               newState = {...state}
               newState[action.payload.id] = action.payload
               return newState
          default:
               return state;       
      }
  }

  export default profileReducer