// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';


const setUser = (user) => ({
  type: SET_USER,
  payload: user
});


const removeUser = () => ({
  type: REMOVE_USER,
})


const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
  
    dispatch(setUser(data));
  }
}

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });
  
  
  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};


export const signUp = (name, email, password, repeatPassword, dog, age) => async (dispatch) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      password,
      confirm: repeatPassword,
      dog,
      age
    }),
  });
  
  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

// -------------------------------------------------LIKES

const CREATE_LIKE = 'session/CREATE_LIKE'
const GET_LIKES = 'session/GET_LIKES'
const CREATE_UNLIKE = 'session/CREATE_UNLIKE'

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
        console.log(newLike)
        dispatch(createLike(newLike))
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
        dispatch(createUnlike(newUnlike))
        return newUnlike
    }
}


export const getLikesThunk = () => async(dispatch) => {

    const res = await fetch('api/likes')

    if (res.ok) {
       const likes = await res.json()
       dispatch(getLikes(likes))
       return likes
    }
}

//--------------------------------------------------------------IMAGES


const DEL_IMAGE = 'session/DEL_IMAGE'
const ADD_IMAGE = 'session/ADD_IMAGE'

const deleteImage = (image) => ({
  type: DEL_IMAGE,
  payload: image
})


const addImage = (image) => ({
  type: ADD_IMAGE,
  payload: image
})

export const deleteImageThunk = (imageId) => async(dispatch) => {

  const res = await fetch('/api/users/delete', {
    method: 'DELETE',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify( imageId )
})


if (res.ok) {
    const deleted = await res.json()
    dispatch(deleteImage(deleted))
    return deleted
}
}

export const addImageThunk = (formData) => async(dispatch) => {

  const res = await fetch('/api/users/upload', {
    method: 'POST',
    body: formData
})


if (res.ok) {
    const newImage = await res.json()
    dispatch(addImage(newImage))
    return newImage
}
}




//--------------------------------------------------------------MATCHES

const GET_MATCHES = 'session/GET_MATCHES'
const DEL_MATCH = 'session/DEL_MATCH'

const getMatches = (matches) => ({
  type: GET_MATCHES,
  payload: matches
})

const deleteMatch = (match) => ({
  type: DEL_MATCH,
  payload: match
})

export const getMatchesThunk = () => async(dispatch) => {

  const res = await fetch('/api/matches')

  if (res.ok) {
      const matches = await res.json()
      dispatch(getMatches(matches))
      return matches
  }
}


export const deleteMatchThunk = (matchId) => async (dispatch) => {

  const res = await fetch('/api/matches/delete', {
      method: 'DELETE',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ matchId })
  })


  if (res.ok) {
      const deleted = await res.json()
      dispatch(deleteMatch(deleted))
      return deleted
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload }
    case REMOVE_USER:
      return { user: null }
    case CREATE_LIKE:
        console.log(state)
        let likeState = {
          ...state,
             user: {
               ...state.user,
                  likes: state.user.likes.concat(action.payload) 
                }
        }    
        return likeState
    case CREATE_UNLIKE:
      console.log(state)
        let unlikeState = {
          ...state,
             user: {
               ...state.user,
                  likes: state.user.likes.concat(action.payload) 
                }
        }    
        return unlikeState
        
    case DEL_MATCH:
        let delMatchState = {
          ...state,
            user: {
              ...state.user,
                 matches: state.user.matches.filter(match => match.id !== action.payload?.id)
            }
        }
        return delMatchState;
    case GET_MATCHES:
        console.log(action.payload)
        // let newMatches = action.payload.matched?.forEach((match) => matches)
        let matchState = {
          ...state,
            user: {
              ...state.user,
                 matches: action.payload.matched
            }
        }
        return matchState
    case DEL_IMAGE:
        let profileState = {
          ...state,
            user: {
              ...state.user,
              images: state.user.images.filter(image => image.id !== action.payload?.id)
            }
        }
        return profileState
    case ADD_IMAGE:
      let newProfileState = {
        ...state,
          user: {
            ...state.user,
              images: state.user.images.concat(action.payload)
          }
        }
        return newProfileState
    default:
      return state;
  }
}
