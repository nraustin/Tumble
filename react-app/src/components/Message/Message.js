import React, { useState, useEffect } from "react";
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
          {!editMessage ?
          <div className="messageContainer">
            <div className="messageContent">
                {msg?.content}
            </div>

            {user?.id === msg?.user_id && (
                <>
                    <div className="messageEditIcon" onClick={handleMessageEdit}>
                        <FiEdit2/>
                    </div>
                    <div className="messageTrashIcon" onClick={handleMessageDelete} id={msg.id}>
                        <FiTrash2/>
                    </div>
                </>)}
            </div>
            : <EditMessage msg={msg}/> }
        </>
    )
}

export default Message