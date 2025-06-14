import React, { useState, useEffect } from 'react';
import { FaComments, FaPaperPlane } from 'react-icons/fa';
import { IoClose, IoArrowBack } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { collection, query, where, orderBy, onSnapshot, addDoc, serverTimestamp, getDocs, writeBatch, limit } from 'firebase/firestore';
import './DoctorChat.css';
import { db } from '../../../config/firebase';

export const DoctorChat = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [showMessages, setShowMessages] = useState(false);
  const [messages, setMessages] = useState([]); // New state for real-time messages
  const { user } = useSelector((state) => state?.logedUserSlice);

  // Real-time listener for messages in active chat
  useEffect(() => {
    if (!activeChat) {
      setMessages([]);
      return;
    }

    const messagesRef = collection(db, 'chats', activeChat, 'messages');
    const messagesQuery = query(messagesRef, orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const messagesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(messagesData);
    });

    return () => unsubscribe();
  }, [activeChat]);

  // Mark messages as read when entering a chat
  useEffect(() => {
    if (!user?.id || !user?.Doctor?.id) return;

    const chatsRef = collection(db, 'chats');

    const unsubscribe = onSnapshot(chatsRef, async (snapshot) => {
      const chatDocs = snapshot.docs;

      const chatsData = await Promise.all(
        chatDocs.map(async (chatDoc) => {
          const chatId = chatDoc.id;

          if (!chatId.endsWith(`_${user.Doctor.id}`)) return null;

          const messagesRef = collection(db, 'chats', chatId, 'messages');

          // Get the last message
          const lastMessageQuery = query(messagesRef, orderBy('timestamp', 'desc'), limit(1));
          const lastMessageSnapshot = await getDocs(lastMessageQuery);
          const lastMessage = lastMessageSnapshot.docs[0]?.data();

          // Count unread messages from other users (patients)
          const unreadQuery = query(
            messagesRef,
            where('isRead', '==', false),
            where('userId', '!=', user.Doctor.id)
          );
          const unreadSnapshot = await getDocs(unreadQuery);
          const unreadCount = unreadSnapshot.size;

          // Determine if chat should be marked as unread
          const hasUnreadMessages = unreadCount > 0;

          // Get the sender info for last message display
          const isLastMessageFromDoctor = lastMessage?.userId === user.Doctor.id;

          return {
            id: chatId,
            doctorId: chatDoc.data().doctorId,
            doctorName: chatDoc.data().doctorName,
            patientId: chatDoc.data().patientId,
            patientName: chatDoc.data().patientName,
            timestamp: lastMessage?.timestamp,
            lastMessage: lastMessage?.text || 'No messages yet',
            lastMessageSender: isLastMessageFromDoctor ? 'You' : chatDoc.data().patientName,
            isLastMessageFromDoctor,
            isRead: !hasUnreadMessages,
            unreadCount,
            hasUnreadMessages,
          };
        })
      );

      const filteredChats = chatsData
        .filter(Boolean)
        .sort((a, b) => {
          if (!a.timestamp && !b.timestamp) return 0;
          if (!a.timestamp) return 1;
          if (!b.timestamp) return -1;
          return b.timestamp.toMillis() - a.timestamp.toMillis();
        });

      setChats(filteredChats);
    });

    return () => unsubscribe();
  }, [user?.id]);

  const truncateMessage = (message, maxLength = 50) => {
    if (!message) return 'No messages yet';
    if (message.length <= maxLength) return message;
    return message.substring(0, maxLength) + '...';
  };

  // Helper function to format last message with sender info
  const formatLastMessage = (chat) => {
    if (!chat.lastMessage || chat.lastMessage === 'No messages yet') {
      return 'No messages yet';
    }

    const truncatedMessage = truncateMessage(chat.lastMessage);

    if (chat.isLastMessageFromDoctor) {
      return `You: ${truncatedMessage}`;
    } else {
      return truncatedMessage;
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setShowMessages(false);
      setActiveChat(null);
    }
  };

  const handleChatSelect = (chatId) => {
    setActiveChat(chatId);
    setShowMessages(true);
  };

  const handleBackToList = () => {
    setShowMessages(false);
    setActiveChat(null);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeChat || !user?.id) return;

    const activeChatData = chats.find(chat => chat.id === activeChat);
    if (!activeChatData) return;

    const messageData = {
      text: newMessage.trim(),
      timestamp: serverTimestamp(),
      isRead: false,
      doctorId: user?.Doctor?.id,
      userId: user?.Doctor?.id,
      userName: user.name
    };

    try {
      const messagesRef = collection(db, 'chats', activeChat, 'messages');
      await addDoc(messagesRef, messageData);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (showMessages && messages.length > 0) {
      const messagesContainer = document.querySelector('.chat-messages');
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    }
  }, [messages, showMessages]);

  return (
    <div className="chat-container">
      {!isOpen && (
        <button className="chat-toggle-button" onClick={toggleChat}>
          <FaComments size={24} />
          {chats.some(chat => !chat.isRead ) && (
            <span className="notification-badge">
              {chats.filter(chat => !chat.isRead).length}
            </span>
          )}
        </button>
      )}

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            {showMessages ? (
              <>
                <button className="back-button" onClick={handleBackToList}>
                  <IoArrowBack size={24} />
                </button>
                <h3>{chats.find(chat => chat.id === activeChat)?.patientName}</h3>
              </>
            ) : (
              <h3>Messages</h3>
            )}
            <button className="close-button" onClick={toggleChat}>
              <IoClose size={24} />
            </button>
          </div>

          {!showMessages ? (
            <div className="chat-list">
              {chats?.map(chat => (
                <div
                  key={chat.id}
                  className={`chat-item ${chat.hasUnreadMessages ? 'unread' : ''}`}
                  onClick={() => handleChatSelect(chat.id)}
                >
                  <div className="chat-item-header">
                    <span className="patient-name">{chat.patientName}</span>
                    <div className="header-right">
                      <span className="timestamp">{formatTimestamp(chat.timestamp)}</span>
                      {chat.hasUnreadMessages && (
                        <span className="unread-count-badge">{chat.unreadCount}</span>
                      )}
                    </div>
                  </div>
                  <div className="chat-item-content">
                    <p className={`last-message ${chat.hasUnreadMessages ? 'unread-text' : ''}`}>
                      {formatLastMessage(chat)}
                    </p>
                    {chat.hasUnreadMessages && (
                      <div className="unread-indicator"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="chat-messages">
                {messages?.map((message) => (
                  <div
                    key={message.id}
                    className={`message ${message.userId === user?.Doctor?.id ? 'user' : 'other'}`}
                  >
                    <div className="message-content">{message.text}</div>
                    <div className="message-time">{formatTimestamp(message.timestamp)}</div>
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
            </>
          )}
        </div>
      )}
    </div>
  );
};

