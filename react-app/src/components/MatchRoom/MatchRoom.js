import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { io } from 'socket.io-client';
import * as profileActions from '../../store/profile'
let socket;

const MatchRoom = () => {
    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState([]);

    const dispatch = useDispatch();
    const history = useHistory();
    const { matchId } = useParams()

    const user = useSelector(state => state.session.user)

    // useEffect(() => {
    //     // open socket connection
    //     // create websocket
    //     socket = io();

    //     socket.on("chat", (chat) => {
    //         setMessages(messages => [...messages, chat])
    //     })
    //     // when component unmounts, disconnect
    //     return (() => {
    //         socket.disconnect()
    //     })
    // }, [])

    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    };

    const sendChat = (e) => {
        e.preventDefault()
        socket.emit("chat", { user: user.name, msg: chatInput });
        setChatInput("")
    }

    const handleUnmatch = () => {
        console.log(matchId)
        dispatch(profileActions.deleteMatchThunk(matchId))
        // history.push('/users')
    
      }

    return (user && (
        <>
        <div>
            <div>
                {messages.map((message, ind) => (
                    <div key={ind}>{`${message.user}: ${message.msg}`}</div>
                ))}
            </div>
            <form onSubmit={sendChat}>
                <input
                    value={chatInput}
                    onChange={updateChatInput}
                />
                <button type="submit">Send</button>
            </form>
        </div>
        <button onClick={handleUnmatch}>Unmatch</button>
        </>
    )
    )
};


export default MatchRoom;