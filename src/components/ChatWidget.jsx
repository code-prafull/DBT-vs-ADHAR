import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

// ✅ Gemini API configuration
const API_KEY = "AIzaSyCUPH3BtQGeYGmCTOvvE5w35zPN4U3wYR8";
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";

// System prompt for DBT and scholarship context
const SYSTEM_PROMPT = `You are an expert AI assistant specializing in Direct Benefit Transfer (DBT), NPCI payment systems, and Indian banking services.

Focus areas:
• DBT Schemes: PM-KISAN, MGNREGA, LPG subsidies, scholarship transfers
• NPCI Systems: UPI, IMPS, NEFT, RTGS, RuPay cards, Bharat Bill Pay
• Banking Services: Account opening, KYC, Aadhaar linking, Jan Dhan accounts
• Digital Payments: UPI setup, payment security, transaction limits
• Government Banking: DBT account requirements, subsidy deposits

Provide accurate, step-by-step guidance. Include relevant government helpline numbers and official websites when appropriate. Keep responses concise for chat widget format. You can respond in both Hindi and English based on user preference.`;

// Function to call Gemini API with better error handling and retry logic
async function getGeminiResponse(userMessage, conversationHistory = [], retryCount = 0) {
  if (!API_KEY || API_KEY === "YOUR_API_KEY_HERE") {
    return "⚠️ Please set up API Key to enable chat functionality.";
  }

  try {
    // Build conversation context (last 4 messages for widget)
    const contextMessages = conversationHistory.slice(-4);
    const fullPrompt = SYSTEM_PROMPT + '\n\nConversation History:\n' + 
      contextMessages.map(msg => `${msg.from === 'user' ? 'User' : 'Assistant'}: ${msg.text}`).join('\n') + 
      '\n\nUser: ' + userMessage + '\n\nAssistant:';

    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: fullPrompt }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 512,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("API Error:", response.status, errorData);
      
      // Retry logic for 5xx errors
      if (response.status >= 500 && retryCount < 2) {
        console.log(`Retrying API call... Attempt ${retryCount + 1}`);
        await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1))); // Progressive delay
        return getGeminiResponse(userMessage, conversationHistory, retryCount + 1);
      }
      
      return `⚠️ API Error (${response.status}): Please try again.`;
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
      return data.candidates[0].content.parts[0].text.trim();
    } else {
      console.error("Unexpected API response:", data);
      return "⚠️ Sorry, I couldn't generate a proper response. Please try again.";
    }
  } catch (error) {
    console.error("API Call Error:", error);
    
    // Retry for network errors
    if (error.name === 'TypeError' && error.message.includes('fetch') && retryCount < 2) {
      console.log(`Retrying due to network error... Attempt ${retryCount + 1}`);
      await new Promise(resolve => setTimeout(resolve, 2000)); // 2 second delay for network issues
      return getGeminiResponse(userMessage, conversationHistory, retryCount + 1);
    }
    
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return "⚠️ Network error: Please check your connection.";
    }
    return "⚠️ I'm having technical difficulties. Please try again.";
  }
}

const ChatWidget = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: t('chatwidget_welcome'), timestamp: new Date().toLocaleTimeString() }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('connected'); // connected, error, reconnecting

  const messagesEndRef = useRef(null);

  // Auto-scroll to the bottom of the chat window whenever a new message is added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMessage = { 
      from: 'user', 
      text: trimmed,
      timestamp: new Date().toLocaleTimeString()
    };
    
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    setConnectionStatus('reconnecting');

    try {
      const botReply = await getGeminiResponse(trimmed, messages);
      const botMessage = {
        from: 'bot',
        text: botReply,
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages([...newMessages, botMessage]);
      setConnectionStatus('connected');
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        from: 'bot',
        text: t('api_error_message') || '⚠️ Connection error. Please try again.',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages([...newMessages, errorMessage]);
      setConnectionStatus('error');
      
      // Reset status after 3 seconds
      setTimeout(() => setConnectionStatus('connected'), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      { from: 'bot', text: t('chatwidget_welcome'), timestamp: new Date().toLocaleTimeString() }
    ]);
  };

  return (
    <div className="relative z-50">
      {/* Floating Chatbot Icon */}
      <button
        onClick={toggleChat}
        className="fixed bottom-5 left-5 w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full shadow-2xl flex items-center justify-center transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300 animate-[pulse_3s_ease-in-out_infinite] text-white font-bold text-xl"
        aria-label="Open Chatbot"
      >
        🤖
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-5 left-24 w-[450px] h-[600px] bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col transition-all duration-300 ease-in-out">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-t-xl">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full animate-pulse ${
                connectionStatus === 'connected' ? 'bg-green-400' :
                connectionStatus === 'error' ? 'bg-red-400' : 'bg-yellow-400'
              }`}></div>
              <h2 className="text-lg font-semibold">{t('ai_assistant')}</h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={clearChat}
                className="p-1 hover:bg-purple-700 rounded-full transition"
                title={t('clear_chat')}
                aria-label="Clear Chat"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
              <button
                onClick={toggleChat}
                className="p-1 hover:bg-purple-700 rounded-full transition"
                aria-label="Close Chatbot"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 px-4 py-3 space-y-4 overflow-y-auto bg-gray-50 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
            {messages.map((msg, index) => (
              msg.from === 'bot' ? (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xs">AI</div>
                  <div className="p-3 bg-blue-50 rounded-lg max-w-[80%] text-sm text-gray-800">
                    <div className="whitespace-pre-wrap">{msg.text}</div>
                    {msg.timestamp && (
                      <div className="text-xs text-gray-500 mt-1">{msg.timestamp}</div>
                    )}
                  </div>
                </div>
              ) : (
                <div key={index} className="flex justify-end">
                  <div className="p-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg max-w-[80%] text-sm">
                    <div>{msg.text}</div>
                    {msg.timestamp && (
                      <div className="text-xs text-purple-100 mt-1">{msg.timestamp}</div>
                    )}
                  </div>
                </div>
              )
            ))}
            {loading && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xs">AI</div>
                <div className="p-3 bg-gray-100 rounded-lg text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                    <span>{t('typing')}</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t bg-white">
            {/* Quick Suggestions - only show when no conversation */}
            {messages.length === 1 && (
              <div className="mb-3">
                <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-1">
                  {[
                    "How to check DBT status?",
                    "Aadhaar linking help",
                    "UPI payment issues",
                    "Jan Dhan account info"
                  ].map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => setInput(suggestion)}
                      className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full hover:bg-blue-100 transition"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t('ask_about_dbt')}
                className="flex-1 px-4 py-2 text-sm bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                disabled={loading}
              />
              <button
                onClick={sendMessage}
                disabled={loading}
                className={`p-2 text-white rounded-full transition focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-purple-600 hover:bg-purple-700'
                }`}
                aria-label="Send Message"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <svg className="w-5 h-5 rotate-90" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;