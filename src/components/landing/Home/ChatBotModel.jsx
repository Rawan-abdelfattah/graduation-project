import { useState, useRef, useEffect } from "react";
import { X, Send, Bot, Mic, MicOff } from "lucide-react";
import ChatMessage from "./ChatMessages";

const ChatBot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Hi, I'm here to guide you to the right medical specialist. Please describe your symptoms.",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatBotResponse = (data) => {
    let responseText = "";
    
    if (!data.predictions) {
      responseText = "I need more information about your symptoms. Could you please describe more symptoms?";
    } else {
      // Get all predictions
      const predictions = data.predictions;
      
      // Count department occurrences
      const departmentCounts = {};
      predictions.forEach(pred => {
        departmentCounts[pred.department] = (departmentCounts[pred.department] || 0) + 1;
      });
      
      // Find most frequent department
      let recommendedDepartment = predictions[0].department;
      let maxCount = 1;
      
      for (const [dept, count] of Object.entries(departmentCounts)) {
        if (count > maxCount) {
          maxCount = count;
          recommendedDepartment = dept;
        }
      }
      
      // If no department is repeated, use the one with highest confidence
      if (maxCount === 1) {
        recommendedDepartment = predictions[0].department;
      }

      // Check if the response is in Arabic
      const isArabic = /[\u0600-\u06FF]/.test(predictions[0].disease);
      
      if (isArabic) {
        responseText = "الحالات المحتملة:\n";
        predictions.forEach((pred, index) => {
          responseText += `${index + 1}. ${pred.disease}\n`;
        });
        responseText += `\nبناءً على تحليل الأعراض، نوصي بزيارة قسم: ${recommendedDepartment}`;
      } else {
        responseText = "Possible conditions:\n";
        predictions.forEach((pred, index) => {
          responseText += `${index + 1}. ${pred.disease}\n`;
        });
        responseText += `\nBased on symptom analysis, we recommend visiting the: ${recommendedDepartment} department`;
      }
    }
    
    return responseText;
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    try {
      const formData = new FormData();
      formData.append('symptoms', inputText);

      const response = await fetch('https://chatbot.pevidea.com/classify-symptoms', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to get response from server');
      }

      const data = await response.json();
      
      const botResponse = {
        id: (Date.now() + 1).toString(),
        text: formatBotResponse(data),
        isBot: true,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error:', error);
      const errorResponse = {
        id: (Date.now() + 1).toString(),
        text: "I apologize, but I'm having trouble processing your symptoms right now. Please try again in a moment.",
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = async () => {
        const audioBlob = new Blob(chunks, { type: 'audio/mp3' });
        await handleAudioUpload(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const handleAudioUpload = async (audioBlob) => {
    const userMessage = {
      id: Date.now().toString(),
      text: "🎤 Voice message...",
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const formData = new FormData();
      formData.append('audio_file', audioBlob, 'recording.mp3');

      const response = await fetch('https://chatbot.pevidea.com/classify-symptoms', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to get response from server');
      }

      const data = await response.json();
      
      const botResponse = {
        id: (Date.now() + 1).toString(),
        text: formatBotResponse(data),
        isBot: true,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error:', error);
      const errorResponse = {
        id: (Date.now() + 1).toString(),
        text: "I apologize, but I'm having trouble processing your voice message right now. Please try again in a moment.",
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleReset = async () => {
    try {
      await fetch('https://chatbot.pevidea.com/reset-conversation', {
        method: 'POST',
      });
      setMessages([
        {
          id: "1",
          text: "Hi, I'm here to guide you to the right medical specialist. Please describe your symptoms.",
          isBot: true,
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error('Error resetting conversation:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md h-[600px] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-emerald-600 text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold">DoctorBot</h3>
              <p className="text-emerald-100 text-sm">Medical Assistant</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleReset}
              className="text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full hover:bg-opacity-30 transition-colors"
            >
              Reset
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          
          {isTyping && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white p-3 rounded-2xl rounded-tl-md shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t">
          <div className="flex items-center space-x-2">
            <button
              onClick={isRecording ? stopRecording : startRecording}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                isRecording 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              }`}
            >
              {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your symptoms..."
              className="flex-1 border border-gray-300 rounded-full bg-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
              className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;