import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { List } from "@material-ui/core";
import * as profileActions from '../../store/profile'

const MatchRoom = () => {
    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState([]);

    const dispatch = useDispatch();
    const history = useHistory();
    const { matchId } = useParams()

    const user = useSelector(state => state.session.user)

    console.log(user)




    const handleUnmatch = () => {
        console.log(matchId)
        dispatch(profileActions.deleteMatchThunk(matchId))
        history.push('/users')
    
      }

    return (user && (
        <>
        <div className="chatContainer">
            <div className="chatMessages">
                <List className="messageList">

                </List>
            </div>

        </div>

        <button onClick={handleUnmatch}>Unmatch</button>
        </>
    )
    )
};


export default MatchRoom;