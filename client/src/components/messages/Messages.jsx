import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import Message from './Message';

const Messages = ({ currentChat }) => {
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);
  const [profileDoc, setProfileDoc] = useState('');
  const [profilePat, setProfilePat] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  // Initialize Socket.IO connection
  useEffect(() => {
    // Only initialize socket if we have a valid currentChat.id
    if (!currentChat?.id) return;

    // Socket.IO connection with error handling
    socketRef.current = io('http://localhost:3001', {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      transports: ['websocket', 'polling']
    });

    // Socket event handlers
    socketRef.current.on('connect', () => {
      setIsConnected(true);
      console.log('Connected to Socket.IO server');
      socketRef.current.emit('joinConversation', currentChat.id);
    });

    socketRef.current.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      setIsConnected(false);
    });

    socketRef.current.on('newMessage', (message) => {
      setMessages(prevMessages => [...prevMessages, message]);
    });

    // Cleanup on unmount or when currentChat changes
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
        setIsConnected(false);
      }
    };
  }, [currentChat?.id]);

  // Fetch messages when conversation changes
  useEffect(() => {
    const fetchMessages = async () => {
      if (!currentChat?.id) return;
      
      try {
        const { data } = await axios.get(
          `http://localhost:3001/api/conversations/${currentChat.id}/messages`
        );
        
        if (data?.[0]?.conversation) {
          setProfileDoc(data[0].conversation.provider.photoUrl);
          setProfilePat(data[0].conversation.User.photoUrl);
          setMessages(data);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [currentChat?.id]);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedMessage = newMessage.trim();
    
    if (!trimmedMessage || !isConnected || !currentChat?.id) return;
    let role=localStorage.getItem('role')
    try {
      const messageSocket = {
        conversationId: currentChat.id,
        sender: role,
        createdAt: new Date().toISOString(),
        content: trimmedMessage,
      };

      socketRef.current.emit('sendMessage', messageSocket);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="chatBox pt-32">
      <div className="chatBoxWrapper">
        <div className="chatBoxTop">
          {messages.map((message) => (
            <div key={message.id || Date.now()}>
              <Message
                profileDoc={profileDoc}
                profilePat={profilePat}
                message={message}
                own={message.sender === 'user'}
              />
            </div>
          ))}
          <div ref={messagesEndRef} />
          
          <form onSubmit={handleSubmit} className="chatBoxBottom">
            <input
              className="w-full h-12 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              type="text"
              placeholder={isConnected ? "Write your message..." : "Connecting..."}
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
              disabled={!isConnected}
            />
            <button 
              type="submit" 
              className="buttonSend"
              disabled={!isConnected || !newMessage.trim()}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Messages;