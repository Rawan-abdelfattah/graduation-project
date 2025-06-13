import React, { useState, useEffect } from 'react';
import { FaComments, FaPaperPlane } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { getDatabase, ref, onValue, push, set, get } from 'firebase/database';
import './DoctorChat.css';
import {app,db} from '../../../config/firebase';

export const DoctorChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const { user } = useSelector((state) => state?.logedUserSlice);

  useEffect(() => {
    if (user?.id) {
      // Listen for user's chats
      const userChatsRef = ref(db, `userChats/${user.id}`);
      onValue(userChatsRef, async (snapshot) => {
        const userChatsData = snapshot.val() || {};
        const chatPromises = Object.entries(userChatsData).map(async ([otherUserId, chatId]) => {
          // Get other user's details
          const otherUserRef = ref(db, `users/${otherUserId}`);
          const otherUserSnapshot = await get(otherUserRef);
          const otherUserData = otherUserSnapshot.val();

          // Get chat details
          const chatRef = ref(db, `chats/${chatId}`);
          const chatSnapshot = await get(chatRef);
          const chatData = chatSnapshot.val();

          return {
            id: chatId,
            otherUserId,
            otherUserName: otherUserData?.name || 'Unknown User',
            messages: Object.entries(chatData?.messages || {}).map(([msgId, msg]) => ({
              id: msgId,
              ...msg
            })),
            lastMessage: chatData?.lastMessage
          };
        });

        const chatResults = await Promise.all(chatPromises);
        setChats(chatResults);
        if (chatResults.length > 0 && !activeChat) {
          setActiveChat(chatResults[0].id);
        }
      });
    }
  }, [user?.id]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeChat || !user?.id) return;

    const chatRef = ref(db, `chats/${activeChat}/messages`);
    const newMessageRef = push(chatRef);
    const timestamp = Date.now();

    const messageData = {
      senderId: user.id,
      text: newMessage.trim(),
      timestamp
    };

    try {
      await set(newMessageRef, messageData);

      // Update last message
      const lastMessageRef = ref(db, `chats/${activeChat}/lastMessage`);
      await set(lastMessageRef, {
        text: newMessage.trim(),
        timestamp
      });

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const startNewChat = async (otherUserId) => {
    if (!user?.id || !otherUserId) return;

    // Check if chat already exists
    const userChatsRef = ref(db, `userChats/${user.id}/${otherUserId}`);
    const otherUserChatsRef = ref(db, `userChats/${otherUserId}/${user.id}`);

    const snapshot = await get(userChatsRef);
    if (snapshot.exists()) {
      setActiveChat(snapshot.val());
      return;
    }

    // Create new chat
    const newChatRef = push(ref(db, 'chats'));
    const chatId = newChatRef.key;

    const chatData = {
      participants: {
        [user.id]: true,
        [otherUserId]: true
      },
      messages: {},
      lastMessage: null
    };

    try {
      await set(newChatRef, chatData);
      await set(userChatsRef, chatId);
      await set(otherUserChatsRef, chatId);
      setActiveChat(chatId);
    } catch (error) {
      console.error('Error creating new chat:', error);
    }
  };

  return (
    <div className="chat-container">
      {!isOpen && (
        <button className="chat-toggle-button" onClick={toggleChat}>
          <FaComments size={24} />
        </button>
      )}

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-tabs">
              {chats.map(chat => (
                <button
                  key={chat.id}
                  className={`chat-tab ${activeChat === chat.id ? 'active' : ''}`}
                  onClick={() => setActiveChat(chat.id)}
                >
                  {chat.otherUserName}
                </button>
              ))}
            </div>
            <button className="close-button" onClick={toggleChat}>
              <IoClose size={24} />
            </button>
          </div>

          <div className="chat-messages">
            {chats.find(chat => chat.id === activeChat)?.messages.map((message) => (
              <div
                key={message.id}
                className={`message ${message.senderId === user?.id ? 'user' : 'other'}`}
              >
                {message.text}
              </div>
            ))}
          </div>

          <form onSubmit={sendMessage} className="chat-input">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
            />
            <button type="submit">
              <FaPaperPlane size={20} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

