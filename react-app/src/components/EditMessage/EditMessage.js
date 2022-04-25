import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as profileActions from '../../store/profile'
import * as matchActions from '../../store/match'

const EditMessage = () => {

    const dispatch = useDispatch();

    const history = useHistory();
    const { matchId } = useParams()

    // const user = useSelector(state => state.session.user)
    const matchObj = useSelector(state => state.match)

    const match = Object.values(matchObj)[0]

    const [content, setContent] = useState(match.content)


    const handleMessageEdit = async(e) => {
        e.preventDefault()

        const newMessage = { content, matchId }

        if(content){
            await dispatch(profileActions.editMessageThunk(newMessage))
            await dispatch(matchActions.getMatchThunk(matchId))

            history.push(`/matches/${matchId}`)
        }
    }

    const handleCancelEdit = () => {
        dispatch(matchActions.getMatchThunk(matchId))
    }

    return(
          <div className='editMessageForm'>
            <form onSubmit={handleMessageEdit}>
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