import React from 'react';
import { ChatProvider } from './context/ChatContext';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';

const App: React.FC = () => {
  return (
    <ChatProvider>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 px-4">
        <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-6 space-y-4">
          <h1 className="text-3xl font-bold text-center text-blue-700">💬 Gemini AI Chat</h1>
          <ChatWindow />
          <ChatInput />
        </div>
      </div>
    </ChatProvider>
  );
};

export default App;