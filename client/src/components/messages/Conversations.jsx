import React, { useEffect, useState } from 'react'
import "./conversation.css"
import axios from 'axios';
import Conversation from './Conversation.jsx';

function Conversations({setcurrentChat}) {
  const [conversations, setConversations] = useState([]);
  const getConversations = async () => {
    let token = localStorage.getItem("authToken");
    try {
    //   const response = await axios.get(
    //     "http://localhost:3001/api/doctors/getDoctor",
    //     { headers: { token: token } }
    //   );
      const { data } = await axios.get(
        `http://localhost:3001/api/conversations/1/Allconversations`
      );
      // console.log(data);
      // return
      setConversations(data);
    
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };
  useEffect(() => {
    getConversations();
  }, []);

  return (
    <div style={{ backgroundImage: "url('/src/assets/images/rapport.png')" 
  }}className="chatMenu pt-24 bg-no-repeat bg-cover h-screen">
        <div className="chatMenuRapper ">
          <input
            className="chatMenuInput  rounded-lg"
            type="text"
            placeholder="search for a provider"
          />
          {conversations.map((conversation, key) => {
            return (
              <div
                key={key}
                onClick={() => {
                  setcurrentChat(conversation);
                }}
              >
                <Conversation conversation={conversation} />
              </div>
            );
          })}
        </div>
      </div>
  )
}

export default Conversations