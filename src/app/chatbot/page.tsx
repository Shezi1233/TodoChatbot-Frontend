"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode'; // Make sure to install this package
import ChatWindow from '@/components/chatbot/ChatWindow';

interface User {
  id: number;
  name: string;
}

export default function ChatbotPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated - use 'token' key (consistent with auth.tsx)
    const token = localStorage.getItem('token');
    if (!token) {
      // If not authenticated, redirect to sign in
      router.push('/signin');
      return;
    }

    try {
      // Decode the JWT to get user info
      const decoded: any = jwtDecode(token);
      setUser({
        id: parseInt(decoded.userId || decoded.sub || decoded.user_id),
        name: decoded.name || decoded.username || 'User'
      });
      setIsLoading(false);
    } catch (error) {
      console.error('Error decoding token:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      router.push('/signin');
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Redirect is happening in useEffect
  }

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <header className="bg-gray-900 p-4 border-b border-yellow-600">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-yellow-400">Todo AI Chatbot</h1>
          <div className="flex items-center space-x-4">
            <span className="text-yellow-300">Welcome, {user.name}!</span>
            <button
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                router.push('/signin');
              }}
              className="px-4 py-2 bg-yellow-600 text-black font-semibold rounded-md hover:bg-yellow-500 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      
      <main className="flex-1 overflow-hidden p-4">
        <ChatWindow userId={user.id} />
      </main>
      
      <footer className="bg-gray-900 p-2 text-center text-gray-400 text-sm border-t border-yellow-600">
        Todo AI Chatbot - Secure Task Management
      </footer>
    </div>
  );
}