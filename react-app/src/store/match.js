const GET_MATCH = 'profile/GET_MATCH'
const GET_MATCHES = 'profle/GET_MATCHES'


const getMatch = (match) => ({
    type: GET_MATCH,
    payload: match
})

const getMatches = (matches) => ({
    type: GET_MATCHES,
    payload: matches
})

export const getMatchThunk = (matchId) => async (dispatch) => {

const res = await fetch(`/api/matches/${matchId}`)

if (res.ok) {
    const match = await res.json()
    dispatch(getMatch(match))
    return match
}}

export const getMatchesThunk = () => async(dispatch) => {

    const res = await fetch('/api/matches')

    if (res.ok) {
        const matches = await res.json()
        dispatch(getMatches(matches))
        return matches
    }
}


let initialState = {}

 const matchReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case GET_MATCH:
              let matchState = {};
              matchState[action.payload.id] = action.payload
              return matchState
        case GET_MATCHES:
              newState = {...state};
              action.payload.matches?.forEach((match) => newState[match.id] = match)
              return newState;
        default:
              return state;
    }
} 

export default matchReducer;