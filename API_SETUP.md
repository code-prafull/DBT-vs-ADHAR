# 🤖 AI Chatbot Setup Instructions

## Step 1: Get Your Gemini API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

## Step 2: Add API Key to Chatbot
1. Open `src/pages/Chatbot.jsx`
2. Find line 5: `const API_KEY = "YOUR_API_KEY_HERE";`
3. Replace `"YOUR_API_KEY_HERE"` with your actual API key
4. Save the file

Example:
```javascript
const API_KEY = "AIzaSyC1234567890abcdefghijklmnop";
```

## Step 3: Test the Chatbot
1. Make sure the development server is running (`npm run dev`)
2. Go to the Chatbot page in your app
3. Try asking questions like:
   - "How do I check my DBT status?"
   - "Help with Aadhaar linking"
   - "Tell me about scholarships"

## Features Included:
✅ **Smart Context**: Remembers conversation history
✅ **DBT Specialist**: Focused on scholarships and government benefits
✅ **Bilingual**: Responds in Hindi and English
✅ **Quick Suggestions**: Pre-written questions for easy start
✅ **Error Handling**: Graceful error messages and retry logic
✅ **Modern UI**: Beautiful interface with timestamps and animations
✅ **Clear Chat**: Reset conversation anytime
✅ **Keyboard Shortcuts**: Enter to send, Shift+Enter for new line

## Troubleshooting:
- If you get "Please set up API Key first" → Replace API key in Chatbot.jsx
- If you get network errors → Check your internet connection
- If responses are slow → This is normal for free API tier
- If you hit rate limits → Wait a few minutes and try again

## Security Note:
For production deployment, move the API key to environment variables for better security.