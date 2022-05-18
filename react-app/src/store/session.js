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


export const signUp = (name, email, password, dog, age) => async (dispatch) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      password,
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

//--------------------------------------------------------------MATCHES

const GET_MATCHES = 'session/GET_MATCHES'

const getMatches = (matches) => ({
  type: GET_MATCHES,
  payload: matches
})

export const getMatchesThunk = () => async(dispatch) => {

  const res = await fetch('/api/matches')

  if (res.ok) {
      const matches = await res.json()
      dispatch(getMatches(matches))
      return matches
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
        let unlikeState = {}
        unlikeState[action.payload.id] = action.payload
        return unlikeState
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
    default:
      return state;
  }
}
