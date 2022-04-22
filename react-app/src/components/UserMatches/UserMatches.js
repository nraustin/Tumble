import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { useHistory} from 'react-router-dom';
import * as profileActions from '../../store/profile'

import './UserMatches.css'

const UserMatches = () => {

    const user = useSelector(state => state.session.user)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(profileActions.getUserThunk(user.id))
    }, [dispatch])

    console.log(user.matches[0].matched[0].name)
    
    return (
        <>
        
        <p> Hey, {user.name}. You have: {user.matches?.length === 1 ? <p>{user.matches?.length} match!</p> : <p>{user.matches?.length} matches!</p>}</p>
        
        <div className='allMatchesContainer'>
        <div className='matchesContainer'>
            {user.matches?.map((match) => {
                return (
                <div className='matchCard'>
                    {match?.matched[0].images ? <img src={match?.matched[0].images[0]} className='matchCardImg'/> 
                    : <img src='https://www.pinclipart.com/picdir/middle/190-1902439_dog-daycare-twitter-round-logo-png-transparent-background.png' className='matchCardImg'/>}
                        <div className='matchCardName'>
                            {match?.matched[0].name}
                            </div>
                        <div className='matchCardLocation'>
                            {match?.matched[0].location ? match?.matched[0].location : <p>Somewhere anonymous</p>}
                        </div>
                    </div>
            )})}
        </div>
        </div>
        </>

    )
}

export default UserMatches