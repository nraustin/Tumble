import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { List } from "@material-ui/core";
import Message from "../Message/Message";
import * as profileActions from '../../store/profile'
import * as matchActions from '../../store/match'

import './MatchRoom.css'



const MatchRoom = ({matchUpdate, setMatchUpdate}) => {

    const [loaded, setLoaded] = useState(false)
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
        let res = dispatch(profileActions.deleteMatchThunk(matchId))
        setMatchUpdate(true) 

        if (res) {
        dispatch(profileActions.getUserThunk(user.id))
        setMatchUpdate(false)
            }
        history.push('/users')
    
      }


    return (user && (
        <>
        <div className="chatContainer">
            <div className="chatMessages">
                <List className="messageList">
                    {match?.messages.map(msg => (
                        <Message msg={msg}/>
                            
                        ))}
                </List>
            </div>

        </div>
        <div className='messageForm'>
            <form onSubmit={handleMessage}>
                <textarea
                rows='2'
                cols='30'
                placeholder='Say something...'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                ></textarea>

                <button type='Submit'><i className="fa-regular fa-circle-check"></i>Send</button>
              </form>
            </div>
        <button onClick={handleUnmatch}>Unmatch</button>
        </>
        )
    )
};


export default MatchRoom;