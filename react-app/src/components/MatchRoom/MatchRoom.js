import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { List } from "@material-ui/core";
import Message from "../Message/Message";
import * as profileActions from '../../store/profile'
import * as matchActions from '../../store/match'

import './MatchRoom.css'



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
        setMatchUpdate(true) 

        
        let res = dispatch(matchActions.deleteMatchThunk(matchId))

        if(res){
            dispatch(profileActions.getUserThunk(user?.id))
        }
        
        
        history.push('/users')
    
      }


    return (user && (
        <>
        <div className="chatContainer">
            
                <List className="messageList">
                    {match?.messages?.map(msg => (
                        <>
                        {user?.id === msg?.id ? 
                        <div className="chatMessages"> 
                            <Message msg={msg}/>
                        </div> :
                        <div className="otherUserMessages">
                            <Message msg={msg}/>
                        </div>}
                        </>
                        ))}
                </List>

        </div>
        <div>
            <form onSubmit={handleMessage} className='messageForm'>
                <textarea
                rows='2'
                cols='30'
                placeholder='Send a message'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                ></textarea>

                <button type='Submit' className="messageSubmitB">Send</button>
                <button onClick={handleUnmatch} className="unmatchB">Unmatch</button>
              </form>
            
        </div>
        </>
        )
    )
};


export default MatchRoom;