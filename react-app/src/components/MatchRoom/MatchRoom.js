import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { List } from "@material-ui/core";
import Message from "../Message/Message";
import * as profileActions from '../../store/profile'
import * as sessionActions from '../../store/session'
import * as matchActions from '../../store/match'

import './MatchRoom.css'


import { BiPaperPlane } from "react-icons/bi";


const MatchRoom = ({matchUpdate, setMatchUpdate}) => {

    const [message, setMessage] = useState('');



    const dispatch = useDispatch();
    const history = useHistory();
    const { matchId } = useParams()

    const user = useSelector(state => state.session.user)
    
    const matchObj = useSelector(state => state.match)
    const match = Object.values(matchObj)[0]
    console.log(match?.messages)
    console.log(match?.matched)

    const userImgCheck = match?.matched?.filter(matchUser => (((matchUser?.id === user?.id && matchUser?.images?.length > 0))))

    let userImg;

    if (match && userImgCheck[0]){
        userImg = userImgCheck[0].images[0].userImage
    }

    console.log(userImg)

    const otherUserImgCheck = match?.matched?.filter(matchUser => (((matchUser?.id !== user?.id && matchUser?.images?.length > 0))))

    let otherUserImg;

    if (match && otherUserImgCheck[0]){
        otherUserImg = otherUserImgCheck[0].images[0].userImage
    }

    console.log(otherUserImg)




    useEffect(() => {

        dispatch(matchActions.getMatchThunk(matchId));

      }, [dispatch, matchId]);


    const handleMessage = async(e) => {
        e.preventDefault()

        const newMessage = { userId: user?.id, matchId, content: message }

        await dispatch(profileActions.createMessageThunk(newMessage))
        await dispatch(matchActions.getMatchThunk(matchId))
        

        setMessage('')

        history.push(`/matches/${matchId}`)
    }



    const handleUnmatch = async() => {

        console.log(matchId)
        // setMatchUpdate(true) 

        
        dispatch(sessionActions.deleteMatchThunk(matchId))
        
        // .then(dispatch(sessionActions.getMatchesThunk()))

        // if(res){
        //     dispatch(sessionActions.getMatchesThunk())
        //     dispatch(profileActions.getUserThunk(user?.id))
        // }
        
        
        history.push('/users')
    
      }


    return (user && (
        <>
        <div id="chatContainer">
            <div className="messageList">
                <List >
                    {match?.messages?.map(msg => (
                        <>
                        {user?.id === msg?.user_id ? 
                        <>
                        <div className="chatMessages">
                            <Message msg={msg}/>
                                {userImg ?
                                <img src={userImg} className="chatMessageUserIcon" alt='https://cdn-icons-png.flaticon.com/512/616/616408.png'/> 
                                : <img src='https://cdn-icons-png.flaticon.com/512/616/616408.png' className="chatMessageUserIcon" alt=''/>
                                }
                        </div>
                        
                        </>
                         :
                        <div className="otherUserMessages"> 
                            {otherUserImg ?
                                <img src={otherUserImg} className="chatMessageUserIcon" alt='https://cdn-icons-png.flaticon.com/512/616/616408.png'/> 
                                : <img src='https://cdn-icons-png.flaticon.com/512/616/616408.png' className="chatMessageUserIcon" alt=''/>
                                }
                            <Message msg={msg}/>    
                        </div>}
                        </>
                        ))}
                </List>
                </div>
                <form onSubmit={handleMessage} className='messageForm'>
                    <div className="sendMsgTextareaContainer">
                    <textarea className="sendMsgTextarea"
                    rows='2'
                    cols='32'
                    placeholder='Send a message!'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    ></textarea>
                    </div>
                    
                    <button type='Submit' className="messageSubmitB"><BiPaperPlane/></button>
                    
                </form>

        </div>
        <div id="matchedUserInfoContainer">
            {match?.matched?.map(matchedUser => (
                (matchedUser.id !== user?.id && 
                    <p className="matchedUserInfo">You matched with {matchedUser.name}.</p>)
            ))}
            <button onClick={handleUnmatch} className="unmatchB">Unmatch</button>
        </div>
        </>
        )
    )
};


export default MatchRoom;