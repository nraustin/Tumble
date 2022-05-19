import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as profileActions from '../../store/profile'
import * as matchActions from '../../store/match'

import './EditMessage.css'

import {HiCheck} from 'react-icons/hi'

const EditMessage = ({msg, EditMessage, setEditMessage, userMsgClass}) => {

    const dispatch = useDispatch();

    const history = useHistory();
    const { matchId } = useParams()

    // const user = useSelector(state => state.session.user)
    const matchObj = useSelector(state => state.match)

    const match = Object.values(matchObj)[0]

    const [content, setContent] = useState(match.content)


    const handleMessageEdit = async(e) => {
        e.preventDefault()

        const newMessage = { content, messageId: msg.id }

        if(content){
            await dispatch(profileActions.editMessageThunk(newMessage))
            await dispatch(matchActions.getMatchThunk(matchId))

            history.push(`/matches/${matchId}`)
        }
        setEditMessage(false);
    }

    const handleCancelEdit = () => {
        dispatch(matchActions.getMatchThunk(matchId))
        setEditMessage(false)
    }

    return(
        //   <div className='editMessageForm'>
            <form onSubmit={handleMessageEdit} className='editMessageForm'>
                <textarea className="editMsgTextarea"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                >{msg?.content}</textarea>
                <div className="editMessageButtons">
                    <button type='Submit' className="editMsgSubmitButton"><HiCheck/></button>
                    <button onClick={handleCancelEdit} className="cancelEditMsgButton">CANCEL</button>
                </div>
              </form>
            // </div>

    )
}

export default EditMessage