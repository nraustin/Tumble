import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { NavLink, useHistory} from 'react-router-dom';
import * as profileActions from '../../store/profile'

import './UserMatches.css'

const UserMatches = () => {

    const user = useSelector(state => state.session.user)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(profileActions.getUserThunk(user.id))
    }, [dispatch])

    
    return (
        <>
        
        <p> Hey, {user.name}. You have: {user.matches?.length === 1 ? <p>{user.matches?.length} match!</p> : <p>{user.matches?.length} matches!</p>}</p>
        
        <div className='allMatchesContainer'>
        <div className='matchesContainer'>
        
            {user.matches?.map((match) => (
                match.matched.map((matchedUser) => {
                        return (matchedUser.id !== user.id && ( 
                        <NavLink to={`/matches/${match.id}`} className='matchCard'>
                            {matchedUser?.images ? <img src={matchedUser?.images[0]} className='matchCardImg'/> 
                            : <img src='https://cdn-icons-png.flaticon.com/512/616/616408.png' className='matchCardImg'/>}
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