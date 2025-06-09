import React, { createContext, useContext, useEffect, useState } from 'react';

export interface Message {
  role: 'user' | 'assistant';
  text: string;
  timestamp?: number;
}

interface ChatContextType {
  messages: Message[];
  addUserMessage: (text: string) => void;
  addAssistantMessage: (text: string) => void;
  clearMessages: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>(() => {
    const stored = localStorage.getItem('chatMessages');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const addUserMessage = (text: string) => {
    setMessages((prev) => [...prev, { role: 'user', text, timestamp: Date.now() }]);
  };

  const addAssistantMessage = (text: string) => {
    setMessages((prev) => [...prev, { role: 'assistant', text, timestamp: Date.now() }]);
  };

  const clearMessages = () => setMessages([]);

  return (
    <ChatContext.Provider value={{ messages, addUserMessage, addAssistantMessage, clearMessages }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error('useChat must be used within a ChatProvider');
  return context;
};