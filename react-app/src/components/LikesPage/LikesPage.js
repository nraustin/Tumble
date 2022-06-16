import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import * as profileActions from '../../store/profile'
// import * as matchActions from '../../store/match'
// import * as sessionActions from '../../store/session'

import './LikesPage.css'
import tutorial1 from './tutorial1.png'
import tutorial2 from './tutorial2.png'

const UserLikes = () => {

    const user = useSelector(state => state.session.user)
    // const profileObj = useSelector(state => state.profile)
    // const matches = useSelector(state => state.match)


    // console.log(profileObj)
    // console.log(matches)
    // const profiles = Object.values(profileObj)


    // const likingUsers = user?.likes.map((like) => (profiles.filter((profile) => (profile.id === like.liker_id))))

    // console.log(likingUsers)



    const dispatch = useDispatch()

    useEffect(() => {
        async function getData() {
        // await dispatch(sessionActions.getMatchesThunk())
        // // await dispatch(profileActions.getUserThunk(user.id))
        await dispatch(profileActions.getUsersThunk())
        }
        getData()
        
    }, [dispatch, user?.id])

    // console.log(user?.likes)

    // const handleLikeMatch = (e) => {
    //     e.preventDefault()

    //     const newLike = { userId: user.id, profileId: e.target.value}
    //     dispatch(profileActions.createLikeThunk(newLike))
    // }

    
    return (
        <>
        
        <div className='welcomeGuideIntro'>
            <h1 className='welcomeGuideText'>Welcome to Tumble!</h1>
            <h3>Get started with this handy guide.</h3>
            <div className='tutorialPart1'>
            <img className='tutorial1' src={tutorial1} alt=''/>
            <h4>The core functionality of Tumble comes from the profile deck, accessible on the left through the 'Browse' tab. Think of it like a deck of playing cards.</h4>
            <h5>The arrows on the right and left edges of the deck shuffle through individual profiles in either direction.</h5>
            <h5>The heart icon and indifferent face perform the same action, to the right, but will change the nature of how the deck appears to you:</h5>
            <img className='tutorial2' src={tutorial2} alt=''/>
            <h5>Clicking either of these two buttons will remove the profile from your deck. If you like a certain profile, and want to connect,</h5>
            <h5>Click the 'like' button. That user will eventually see you in their deck, and either like your profile, or pass. If they do like your profile,</h5>
            <h5>A 'match' will be created, where you can directly message that user through a chatroom. You can 'Unmatch' at anytime and end the conversation.</h5>
            <h5>By unmatching, you will not see that user again in your deck, and vice versa for the other user.</h5>

            </div>
        </div>
        
        </>
        )
    }

export default UserLikes