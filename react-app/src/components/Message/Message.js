import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import EditMessage from "../EditMessage/EditMessage";
import * as profileActions from '../../store/profile'
import * as matchActions from '../../store/match'

import './Message.css'

import { BsFillPencilFill, BsTrashFill} from 'react-icons/bs'

const Message = ({msg}) => {

    const dispatch = useDispatch()
    const history = useHistory()
    const { matchId } = useParams()

    const [editMessage, setEditMessage] = useState(false)

    const user = useSelector(state => state.session.user)
    // const match = useSelector(state => state.match)

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
        {user?.id === msg?.user_id ? <div className="sessionChatContainer" id={msg?.id}> 
          {!editMessage ?
            // (user?.id === msg?.user_id ?
              <div className="userMsgAndEditContainer">
                    <div className="userMsgContainer" id={msg?.id}>
                    
                            <div className="messageContentUser">
                                {msg?.content}
                            </div>
                            <div className="messageIcons">
                                <div className="messageEditIcon" onClick={handleMessageEdit} id={msg.id} userMsgClass={'userMsgContainer'}>
                                    <BsFillPencilFill/>
                                </div>
                                <div className="messageTrashIcon" onClick={handleMessageDelete} id={msg.id}>
                                    <BsTrashFill/>
                                </div>
                            </div>   
                    </div>
                    
                 </div>
                //  <div className="userMsgImgContainer">
                     
                //      </div>
                // :
                // <div className="otherMsgContainer">
                //     <div className="messageContent">
                //         {msg?.content}
                //     </div>
                // </div>)
            : 
            <div className="userMsgContainer"> 
                <EditMessage msg={msg} editMessage={editMessage} setEditMessage={setEditMessage}/>
            </div>} 
            </div> : 
            <div className="otherChatContainer" id={msg?.id}>
            {/* {!editMessage ?
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
                : */}
                <div className="otherMsgContainer">
                    <div className="messageContent">
                        {msg?.content}
                    </div>
                </div>
                </div>}
            {/* : <EditMessage msg={msg} editMessage={editMessage} setEditMessage={setEditMessage}/>}
            </div> */}
            
        </>
    )
}

export default Message