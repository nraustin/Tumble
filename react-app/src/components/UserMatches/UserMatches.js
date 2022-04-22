import React, { useEffect, useState } from 'react';
import { useSelector} from 'react-redux'
import { useHistory} from 'react-router-dom';
import * as profileActions from '../../store/profile'

const UserMatches = () => {

    const user = useSelector(state => state.session.user)

    useEffect(() => {
        
    })



    return (
        <>
        
        <p> Hey, {user.name}. You have: {user.matches?.length === 1 ? <p>{user.matches?.length} match!</p> : <p>{user.matches?.length} matches!</p>}</p>
        </>

    )
}

export default UserMatches