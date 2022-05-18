const GET_MATCH = 'profile/GET_MATCH'

const DEL_MATCH = 'profile/DEL_MATCH'


const getMatch = (match) => ({
    type: GET_MATCH,
    payload: match
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


let initialState = {}

 const matchReducer = (state = initialState, action) => {
    let matchState;
    switch(action.type) {
        case GET_MATCH:
              let newState = {};
              newState[action.payload?.id] = action.payload
              return newState
        // case GET_MATCHES:
        //       matchState = {...state};
        //       action.payload.matched?.forEach((match) => matchState[match.id] = match)
        //       console.log(action.payload)
        //       return matchState
        case DEL_MATCH:
              matchState = {...state};
              delete matchState[action.payload?.id]
              return matchState
        default:
              return state;
    }
} 

export default matchReducer;