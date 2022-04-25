import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import * as profileActions from '../../store/profile'
import * as matchActions from '../../store/match'

import './LikesPage.css'

const UserLikes = () => {

    const user = useSelector(state => state.session.user)
    const profileObj = useSelector(state => state.profile)
    const matches = useSelector(state => state.match)


    console.log(profileObj)
    console.log(matches)
    const profiles = Object.values(profileObj)


    const likingUsers = user?.likes.map((like) => (profiles.filter((profile) => (profile.id === like.liker_id))))

    console.log(likingUsers)

    // const filteredProfileLikes = profile.map((prof) => prof.likes)

    // console.log(filteredProfileLikes)

    // const extraFilteredProfileLikes = filteredProfileLikes.filter((likes) => (likes.length > 0))

    // console.log(extraFilteredProfileLikes)

    // const finallyGettingLikes = extraFilteredProfileLikes.filter((like) => like?.liked_id === user.id)

    // console.log(finallyGettingLikes)



    const dispatch = useDispatch()

    useEffect(() => {
        async function getData() {
        await dispatch(matchActions.getMatchesThunk())
        // await dispatch(profileActions.getUserThunk(user.id))
        await dispatch(profileActions.getUsersThunk())
        }
        getData()
        
    }, [dispatch, user?.id])

    console.log(user?.likes)

    const handleLikeMatch = (e) => {
        e.preventDefault()

        const newLike = { userId: user.id, profileId: e.target.value}
        dispatch(profileActions.createLikeThunk(newLike))
    }

    
    return (
        <>
        
        <p className='likeSpace'> Hey, {user.name}. You have: {user.likes?.length === 1 ? <p>{user.likes?.length} like!</p> : <p>{user.likes?.length} likes!</p>}</p>
        
        {user?.likes.map((like) => (
            profiles.filter((profile) => (
                profile.id === like.liker_id)
                
                    

            ))
        )}
        
        </>
        )
    }

export default UserLikes