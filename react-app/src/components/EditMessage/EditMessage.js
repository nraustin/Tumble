import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as profileActions from '../../store/profile'
import * as matchActions from '../../store/match'

import './EditMessage.css'

const EditMessage = ({msg, EditMessage, setEditMessage}) => {

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
          <div className='editMessageForm'>
            <form onSubmit={handleMessageEdit} className='editMessageForm'>
                <textarea
                rows='2'
                cols='30'
                placeholder={content}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                ></textarea>
                <button type='Submit'><i className="fa-regular fa-circle-check"></i>Send</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </form>
            </div>

    )
}

export default EditMessage