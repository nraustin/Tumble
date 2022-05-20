const GET_MATCH = 'match/GET_MATCH'




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
        // case DEL_MATCH:
        //       console.log(action.payload)
        //       delete action.payload?.id
        default:
              return state;
    }
} 

export default matchReducer;