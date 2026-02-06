'use client';

import { useState, useRef, useEffect } from 'react';
import Message from './Message';
import InputArea from './InputArea';
import { Message as MessageType } from '@/types/chat';

interface ChatWindowProps {
  userId: number;
}

export default function ChatWindow({ userId }: ChatWindowProps) {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: 1,
      role: 'assistant',
      content: 'Hello! I\'m your AI assistant. You can ask me to manage your tasks like adding, listing, completing, or deleting tasks. Try saying "Add a task to buy groceries" or "Show my tasks".',
      timestamp: new Date().toISOString(),
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async (input: string) => {
    if (!input.trim() || isLoading) return;

    // Add user message to UI immediately
    const userMessage: MessageType = {
      id: Date.now(), // Temporary ID
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Get auth token
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      // Send message to backend
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${userId}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: input,
          conversation_id: null // Will be handled by backend
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to get response from AI');
      }

      const data = await response.json();

      // Add assistant response to UI
      const assistantMessage: MessageType = {
        id: Date.now() + 1, // Temporary ID
        role: 'assistant',
        content: data.response,
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      // Show error message
      const errorMessage: MessageType = {
        id: Date.now() + 1,
        role: 'assistant',
        content: `Sorry, I encountered an error: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`,
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto bg-gray-900 rounded-lg shadow-lg overflow-hidden border border-yellow-600">
      <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ height: 'calc(100vh - 200px)' }}>
        {messages.map((msg) => (
          <Message key={msg.id} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-yellow-600 p-4 bg-gray-800">
        <InputArea
          onSend={handleSend}
          disabled={isLoading}
          placeholder="Ask me to manage your tasks (e.g., 'Add a task to buy groceries')..."
        />

        {isLoading && (
          <div className="mt-3 text-center text-yellow-400 flex items-center justify-center">
            <span>AI Assistant is thinking...</span>
            <div className="ml-2 h-2 w-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="ml-1 h-2 w-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="ml-1 h-2 w-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
          </div>
        )}
      </div>
    </div>
  );
}