const GET_MATCH = 'profile/GET_MATCH'
const GET_MATCHES = 'profle/GET_MATCHES'
const DEL_MATCH = 'profile/DEL_MATCH'


const getMatch = (match) => ({
    type: GET_MATCH,
    payload: match
})

const getMatches = (matches) => ({
    type: GET_MATCHES,
    payload: matches
})

const deleteMatch = (match) => ({
    type: DEL_MATCH,
    payload: match
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


export const deleteMatchThunk = (matchId) => async (dispatch) => {

    const res = await fetch('/api/matches/delete', {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ matchId })
    })


    if (res.ok) {
        const deleted= await res.json()
        dispatch(deleteMatch)
        return deleted
    }
}


let initialState = {}

 const matchReducer = (state = initialState, action) => {
    let matchState;
    switch(action.type) {
        case GET_MATCH:
              let thisState = {...state};
              matchState[action.payload?.id] = action.payload
              return thisState
        case GET_MATCHES:
              matchState = {...state};
              action.payload.matches?.forEach((match) => matchState[match.id] = match)
              return matchState
        case DEL_MATCH:
              matchState = {...state}
              delete matchState[action.payload?.id]
              return matchState
        default:
              return state;
    }
} 

export default matchReducer;