import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

// ✅ Gemini API Configuration
const API_KEY = "AIzaSyCUPH3BtQGeYGmCTOvvE5w35zPN4U3wYR8"; // Your actual API key
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";

// System prompt for DBT and scholarship context
const SYSTEM_PROMPT = `You are a helpful AI assistant specialized in Direct Benefit Transfer (DBT), Aadhaar linking, NPCI mapping, and Indian government scholarships. You help students with:

1. DBT (Direct Benefit Transfer) status and issues
2. Aadhaar card linking with bank accounts
3. NPCI (National Payments Corporation of India) mapping
4. Scholarship application processes
5. Government document verification
6. Banking and payment issues related to scholarships

Provide accurate, helpful responses in a friendly tone. If you don't know something specific, suggest contacting relevant government offices or checking official portals. Keep responses concise but informative. You can respond in both Hindi and English based on user preference.`;

// Function to call Gemini API with better error handling
async function getGeminiResponse(userMessage, conversationHistory = []) {
  if (!API_KEY || API_KEY === "YOUR_API_KEY_HERE") {
    return "⚠️ कृपया API Key सेट करें / Please set up API Key first.";
  }

  try {
    // Build conversation context
    const contextMessages = conversationHistory.slice(-6); // Last 6 messages for context
    const fullPrompt = `${SYSTEM_PROMPT}

Conversation History:
${contextMessages.map(msg => `${msg.sender === 'user' ? 'User' : 'Assistant'}: ${msg.text}`).join('\n')}

User: ${userMessage}

Assistant:`;

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
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("API Error:", response.status, errorData);
      return `⚠️ API Error (${response.status}): ${errorData.error?.message || 'Unknown error'}`;
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
      return data.candidates[0].content.parts[0].text.trim();
    } else {
      console.error("Unexpected API response structure:", data);
      return "⚠️ Sorry, I couldn't generate a proper response. Please try again.";
    }
  } catch (error) {
    console.error("API Call Error:", error);
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return "⚠️ Network error: Please check your internet connection.";
    }
    return "⚠️ Sorry, I'm having technical difficulties. Please try again later.";
  }
}

export default function Chatbot() {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: t('chatbot_welcome'),
      timestamp: new Date().toLocaleTimeString()
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = {
      sender: "user",
      text: input.trim(),
      timestamp: new Date().toLocaleTimeString()
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const botReply = await getGeminiResponse(userMessage.text, messages);
      const botMessage = {
        sender: "bot",
        text: botReply,
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages([...newMessages, botMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage = {
        sender: "bot",
        text: t('api_error_message'),
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages([...newMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        sender: "bot",
        text: t('chatbot_welcome'),
        timestamp: new Date().toLocaleTimeString()
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold">{t('ai_chat_assistant')}</h1>
                <p className="text-blue-100 mt-1">{t('ai_chat_description')}</p>
              </div>
              <button
                onClick={clearChat}
                className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-lg text-sm transition-colors"
                title="Clear Chat"
              >
                🗑️ {t('clear_chat')}
              </button>
            </div>
          </div>
          
          {/* Chat messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gray-50 dark:bg-gray-700">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.sender === "bot" ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg shadow ${
                    msg.sender === "bot"
                      ? "bg-white dark:bg-gray-600 text-gray-800 dark:text-white border-l-4 border-blue-500"
                      : "bg-blue-500 text-white"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                  {msg.timestamp && (
                    <p className={`text-xs mt-2 opacity-70 ${
                      msg.sender === "bot" ? "text-gray-500 dark:text-gray-400" : "text-blue-100"
                    }`}>
                      {msg.timestamp}
                    </p>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-3 rounded-lg shadow animate-pulse">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                    <span className="text-sm">{t('typing')}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick suggestions */}
          {messages.length === 1 && (
            <div className="px-6 py-3 bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-600">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{t('quick_questions')}:</p>
              <div className="flex flex-wrap gap-2">
                {[
                  t('check_dbt_status'),
                  t('aadhaar_linking_help'),
                  t('scholarship_info'),
                  t('npci_mapping_help')
                ].map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => setInput(suggestion)}
                    className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-xs hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input box */}
          <div className="p-6 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-600">
            <div className="flex space-x-3">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder={t('type_question')}
                disabled={loading}
                rows={input.split('\n').length > 2 ? 3 : 1}
                style={{ minHeight: '50px', maxHeight: '120px' }}
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2 self-end"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>{t('send')}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </>
                )}
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {t('press_enter_send')} • {t('shift_enter_newline')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
