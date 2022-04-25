import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import EditMessage from "../EditMessage/EditMessage";
import * as profileActions from '../../store/profile'
import * as matchActions from '../../store/match'

import './Message.css'

import { FiEdit2, FiTrash2 } from 'react-icons/fi'

const Message = ({msg}) => {

    const dispatch = useDispatch()
    const history = useHistory()
    const { matchId } = useParams()

    const [editMessage, setEditMessage] = useState(false)

    const user = useSelector(state => state.session.user)

    const handleMessageDelete = async(e) => {
        e.preventDefault()

        const deletedMessage = { messageId: e.currentTarget.id }

        console.log(deletedMessage)

        await dispatch(profileActions.deleteMessageThunk(deletedMessage))
        await dispatch(matchActions.getMatchThunk(matchId))

        history.push(`/matches/${matchId}`)

    }

    const handleMessageEdit = async(e) => {
        e.preventDefault()
        setEditMessage(true)
    }


    return (
        <>
        {user?.id === msg?.user_id ? <div className="sessionChatContainer"> 
          {!editMessage ?
            (user?.id === msg?.user_id ? 
              <div className="userMsgContainer">
            
                    <div className="messageContentUser">
                        {msg?.content}
                    </div>

                    <div className="messageIcons">
                        <div className="messageEditIcon" onClick={handleMessageEdit} id={msg.id}>
                            <FiEdit2/>
                        </div>
                        <div className="messageTrashIcon" onClick={handleMessageDelete} id={msg.id}>
                            <FiTrash2/>
                        </div>
                    </div>
                </div>
                :
                <div className="otherMsgContainer">
                    <div className="messageContent">
                        {msg?.content}
                    </div>
                </div>)
            : <EditMessage msg={msg} editMessage={editMessage} setEditMessage={setEditMessage}/>} 
            </div> : 
            <div className="otherChatContainer">
            {!editMessage ?
            (user?.id === msg?.user_id ? 
              <div className="userMsgContainer">
            
                    <div className="messageContent">
                        {msg?.content}
                    </div>

                    <div>
                        <div className="messageEditIcon" onClick={handleMessageEdit} id={msg.id}>
                            <FiEdit2/>
                        </div>
                        <div className="messageTrashIcon" onClick={handleMessageDelete} id={msg.id}>
                            <FiTrash2/>
                        </div>
                    </div>
                </div>
                :
                <div className="otherMsgContainer">
                    <div className="messageContent">
                        {msg?.content}
                    </div>
                </div>)
            : <EditMessage msg={msg} editMessage={editMessage} setEditMessage={setEditMessage}/>}
            </div>
            }
        </>
    )
}

export default Message