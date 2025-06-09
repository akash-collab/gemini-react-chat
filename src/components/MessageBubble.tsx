import React from 'react';
import type { Message } from '../context/ChatContext';

const MessageBubble: React.FC<{ message: Message }> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`mb-4 flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`rounded-2xl px-4 py-2 max-w-[75%] shadow-md text-sm leading-relaxed ${
          isUser ? 'bg-blue-600 text-white' : 'bg-white text-gray-800 border border-gray-200'
        }`}
      >
        <p>{message.text}</p>
        {message.timestamp && (
          <div className="text-[0.7rem] text-right mt-1 opacity-60">
            {new Date(message.timestamp).toLocaleTimeString()}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;