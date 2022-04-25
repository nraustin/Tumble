import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { NavLink } from 'react-router-dom';
import * as profileActions from '../../store/profile'
import * as matchActions from '../../store/match'

import './UserMatches.css'

const UserMatches = () => {

    const user = useSelector(state => state.session.user)
    const matches = useSelector(state => state.match)
    const profileObj = useSelector(state => state.profile)

    const profile = Object.values(profileObj)[0]
    console.log(profile?.id)

    const match = Object.values(matches)
    console.log(match)

    console.log(matches)

    const dispatch = useDispatch()


    useEffect(() => {
        async function getData() {
        await dispatch(matchActions.getMatchesThunk())
        await dispatch(profileActions.getUsersThunk())
        }
        getData()
    }, [dispatch, profile?.id, match?.id])

    

    
    return (
        <>
        
        <p className='space'> Hey, {user.name}. You have: {user.matches?.length === 1 ? <p>{user.matches?.length} match!</p> : <p>{user.matches?.length} matches!</p>}</p>
        
        <div className='allMatchesContainer'>
        <div className='matchesContainer'>
        
            {user.matches?.map((match) => (
                match.matched.map((matchedUser) => {
                        return (matchedUser.id !== user.id && ( 
                        <NavLink to={`/matches/${match.id}`} className='matchCard'>
                            {matchedUser?.images ? <img src={matchedUser?.images[0]} className='matchCardImg' alt=''/> 
                            : <img src='https://cdn-icons-png.flaticon.com/512/616/616408.png' className='matchCardImg' alt=''/>}
                                <div className='matchCardName'>
                                    {matchedUser?.name}
                                    </div>
                                <div className='matchCardLocation'>
                                    {matchedUser?.location ? matchedUser?.location : <p>Somewhere anonymous</p>}
                                </div>
                            </NavLink>)
                )})
            ))}
        </div>
        </div>
        </>

    )
}

export default UserMatches