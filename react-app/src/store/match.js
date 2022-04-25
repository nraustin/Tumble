const GET_MATCH = 'profile/GET_MATCH'



const getMatch = (match) => ({
    type: GET_MATCH,
    payload: match
})

export const getMatchThunk = (matchId) => async (dispatch) => {

const res = await fetch(`/api/matches/${matchId}`)

if (res.ok) {
    const match = await res.json()
    dispatch(getMatch(match))
    return match
}}

let initialState = {}

 const matchReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case GET_MATCH:
              let matchState = {};
              matchState[action.payload.id] = action.payload
              return matchState
        default:
              return state;
    }
} 

export default matchReducer;