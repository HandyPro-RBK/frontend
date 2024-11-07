import React from 'react'
import "./conversation.css"
function Conversation({conversation}) {
  
  return (
    <div className='Conversation' >
        
        <img className='conversationImg' src={conversation.patient?.photoUrl} alt="" />
        <span className='conversationName'>{conversation.patient?.username}</span>
        
    </div>
  )
}

export default Conversation