'use client';

import { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import { Message } from '@/types/chat';
import { sendMessage } from '@/lib/api';

export default function ChatWindow({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      content: 'Hello! I\'m your TaskFlow AI assistant. You can ask me to manage your tasks like adding, listing, completing, or deleting tasks. How can I help you today?',
      timestamp: new Date().toISOString(),
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null); // Track if token is valid
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // Get user ID from token on mount
  useEffect(() => {
    // Try both token keys to support different auth implementations
    const token = localStorage.getItem('authToken') || localStorage.getItem('token');
    if (token) {
      try {
        // Decode JWT to get user ID using jwt-decode
        import('jwt-decode').then(({ jwtDecode }) => {
          const decodedToken: any = jwtDecode(token);
          const userIdFromToken = decodedToken.sub || decodedToken.userId || decodedToken.user_id; // Handle different claim names

          if (userIdFromToken) {
            // Store as string since JWT IDs are often UUIDs
            setUserId(String(userIdFromToken));
            setIsTokenValid(true);
          } else {
            console.error('User ID not found in token');
            setIsTokenValid(false);
          }
        }).catch(err => {
          console.error('Error importing jwt-decode:', err);
          setIsTokenValid(false);
        });
      } catch (error) {
        console.error('Error decoding token:', error);
        setIsTokenValid(false);
      }
    } else {
      console.log('No token found in localStorage');
      setIsTokenValid(false);
    }
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const [currentConversationId, setCurrentConversationId] = useState<number | null>(null);

  const handleSend = async (input: string) => {
    if (!input.trim() || isLoading || !userId) return;

    // Add user message to UI immediately
    const userMessage: Message = {
      id: Date.now(), // Temporary ID
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Send message to backend using the API utility
      // Use currentConversationId if available, otherwise send null to create new conversation
      const data = await sendMessage(input, userId, currentConversationId || 0);

      // Update conversation ID if it's the first message
      if (!currentConversationId) {
        setCurrentConversationId(data.conversation_id);
      }

      // Add assistant response to UI
      const assistantMessage: Message = {
        id: Date.now() + 1, // Temporary ID
        role: 'assistant',
        content: data.response,
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      // Show error message
      const errorMessage: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        content: `Sorry, I encountered an error: ${
          error instanceof Error
            ? error.message
            : typeof error === 'string'
              ? error
              : 'Unknown error occurred'
        }. Please check your connection and try again.`,
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Determine if input should be disabled
  const isInputDisabled = isLoading || !isTokenValid || !userId;

  return (
    <div className="fixed bottom-24 right-4 left-4 sm:left-auto sm:right-6 z-50 w-auto sm:w-[360px] max-w-[calc(100vw-2rem)] h-[70vh] sm:h-[500px] max-h-[500px] bg-black border border-yellow-600 rounded-lg shadow-xl flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-gray-900 p-3 border-b border-yellow-600 flex justify-between items-center">
        <h2 className="text-yellow-400 font-bold">TaskFlow AI</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white focus:outline-none"
          aria-label="Close chat"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-700 text-white rounded-lg px-4 py-2 rounded-bl-none max-w-[80%]">
              <div className="flex items-center">
                <div className="h-2 w-2 bg-yellow-400 rounded-full mr-2 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="h-2 w-2 bg-yellow-400 rounded-full mr-2 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="h-2 w-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-yellow-600 p-3 bg-gray-800">
        <ChatInput
          onSend={handleSend}
          disabled={isInputDisabled}
          placeholder={isTokenValid ? "Ask me to manage tasks..." : "Authentication required..."}
        />
      </div>
    </div>
  );
}