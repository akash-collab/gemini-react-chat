import React, { useState } from 'react';
import { SendHorizonal } from 'lucide-react';
import { useChat } from '../context/ChatContext';

const ChatInput: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const { addUserMessage, addAssistantMessage } = useChat();

  const handleSend = async () => {
    if (!input.trim()) return;
    const userInput = input;
    addUserMessage(userInput);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: userInput }] }] }),
        }
      );
      const data = await res.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from Gemini.';
      addAssistantMessage(reply);
    } catch (err) {
      addAssistantMessage('Error fetching response from Gemini.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2 mt-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        className="flex-1 border border-gray-300 rounded-full px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        disabled={loading}
        placeholder="Ask Gemini something..."
        aria-label="Chat input"
      />
      <button
        onClick={handleSend}
        className="bg-blue-600 hover:bg-blue-700 transition text-white p-2 rounded-full disabled:opacity-50"
        disabled={loading}
        aria-label="Send"
      >
        {loading ? (
          <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
        ) : (
          <SendHorizonal size={20} />
        )}
      </button>
    </div>
  );
};

export default ChatInput;