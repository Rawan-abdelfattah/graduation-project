import { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, Globe } from 'lucide-react';
import ChatMessage from './ChatMessages';

const ChatBot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: "Hi, I'm here to guide you to the right medical specialist. Please describe your symptoms.",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState('en');
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatBotResponse = (data) => {
    let responseText = '';

    // Check if the highest confidence prediction is below 0.3
    const needsMoreSymptoms =
      data.predictions.length > 0 && data.predictions[0].confidence < 0.3;

    if (needsMoreSymptoms) {
      if (language === 'ar') {
        responseText =
          'أحتاج إلى المزيد من المعلومات عن أعراضك. هل يمكنك وصف المزيد من الأعراض؟';
      } else {
        responseText =
          'I need more information about your symptoms. Could you please describe more symptoms?';
      }
    } else {
      // Get the highest confidence prediction
      const topPrediction = data.predictions[0];
      const confidence = Math.round(topPrediction.confidence * 100);

      if (language === 'ar') {
        responseText = `حالتك قد تكون: ${
          topPrediction.disease_ar || topPrediction.disease
        }\nيجب عليك زيارة قسم: ${
          topPrediction.department_ar || topPrediction.department
        }`;
      } else {
        responseText = `Your condition could be: ${topPrediction.disease}\nYou should visit the: ${topPrediction.department} department`;
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

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      // Call the backend API
      const response = await fetch(
        'https://chatbot.pevidea.com/classify-symptoms',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: inputText,
            language: 'auto',
            output_language: language,
          }),
        },
      );

      if (!response.ok) {
        throw new Error('Failed to get response from server');
      }

      const data = await response.json();

      // Format the bot response based on the API response
      const botResponse = {
        id: (Date.now() + 1).toString(),
        text: formatBotResponse(data),
        isBot: true,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error('Error:', error);
      // Fallback response in case of error
      const errorResponse = {
        id: (Date.now() + 1).toString(),
        text:
          language === 'ar'
            ? 'عذراً، لدي مشكلة في معالجة أعراضك الآن. يرجى المحاولة مرة أخرى بعد قليل.'
            : "I apologize, but I'm having trouble processing your symptoms right now. Please try again in a moment.",
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
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
          id: '1',
          text:
            language === 'ar'
              ? 'مرحباً، أنا هنا لتوجيهك إلى الطبيب المختص المناسب. يرجى وصف أعراضك.'
              : "Hi, I'm here to guide you to the right medical specialist. Please describe your symptoms.",
          isBot: true,
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error('Error resetting conversation:', error);
    }
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setShowLanguageMenu(false);
    // Update the initial message when language changes
    setMessages((prev) => {
      const newMessages = [...prev];
      if (newMessages.length > 0) {
        newMessages[0] = {
          ...newMessages[0],
          text:
            newLanguage === 'ar'
              ? 'مرحباً، أنا هنا لتوجيهك إلى الطبيب المختص المناسب. يرجى وصف أعراضك.'
              : "Hi, I'm here to guide you to the right medical specialist. Please describe your symptoms.",
        };
      }
      return newMessages;
    });
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
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full hover:bg-opacity-30 transition-colors flex items-center space-x-1"
              >
                <Globe className="w-4 h-4" />
                <span>{language === 'ar' ? 'العربية' : 'English'}</span>
              </button>
              {showLanguageMenu && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg py-1 z-10">
                  <button
                    onClick={() => handleLanguageChange('en')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    English
                  </button>
                  <button
                    onClick={() => handleLanguageChange('ar')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    العربية
                  </button>
                </div>
              )}
            </div>
            <button
              onClick={handleReset}
              className="text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full hover:bg-opacity-30 transition-colors"
            >
              {language === 'ar' ? 'إعادة' : 'Reset'}
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
            <ChatMessage
              key={message.id}
              message={message}
              language={language}
            />
          ))}

          {isTyping && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white p-3 rounded-2xl rounded-tl-md shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: '0.1s' }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: '0.2s' }}
                  ></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                language === 'ar' ? 'اكتب أعراضك...' : 'Type your symptoms...'
              }
              className="flex-1 border border-gray-300 rounded-full bg-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              dir={language === 'ar' ? 'rtl' : 'ltr'}
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
