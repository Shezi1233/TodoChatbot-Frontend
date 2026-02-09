"use client";

// pages/test-chat-widget.tsx
// This is a temporary test page to verify the chat widget functionality

import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import ChatWidget from '@/components/chat/ChatWidget';

// Mock a JWT token for testing
const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJUZXN0IFVzZXIiLCJpYXQiOjE1MTYyMzkwMjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

export default function TestChatWidgetPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    // Store the mock token in localStorage
    localStorage.setItem('token', mockToken);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  // Decode the token to show user info
  let userInfo = null;
  if (isLoggedIn) {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded: any = jwtDecode(token);
        userInfo = decoded;
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-yellow-400">Chat Widget Test Page</h1>
        
        <div className="mb-8 p-6 bg-gray-900 rounded-lg border border-yellow-600">
          <h2 className="text-xl font-semibold mb-4">Authentication Status</h2>
          
          {isLoggedIn ? (
            <div>
              <p className="text-green-400 mb-2">✅ Logged in as: {userInfo?.name || 'Unknown'}</p>
              <p className="text-gray-400 text-sm mb-4">User ID: {userInfo?.userId || userInfo?.sub || 'Unknown'}</p>
              <button 
                onClick={logout}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div>
              <p className="text-red-400 mb-4">❌ Not logged in</p>
              <button 
                onClick={login}
                className="px-4 py-2 bg-yellow-600 text-black rounded hover:bg-yellow-500 transition-colors"
              >
                Login with Mock Token
              </button>
            </div>
          )}
        </div>

        <div className="mb-8 p-6 bg-gray-900 rounded-lg border border-yellow-600">
          <h2 className="text-xl font-semibold mb-4">Chat Widget Test</h2>
          <p className="text-gray-300 mb-4">
            The chat widget should appear as a floating button at the bottom right of the screen.
            Click it to open the chat interface.
          </p>
          <p className="text-yellow-400">
            Current status: {isLoggedIn ? 'Ready to use chat widget' : 'Login required to use chat'}
          </p>
        </div>

        <div className="p-6 bg-gray-900 rounded-lg border border-yellow-600">
          <h2 className="text-xl font-semibold mb-4">How to Test</h2>
          <ol className="list-decimal list-inside text-gray-300 space-y-2">
            <li>Click the "Login with Mock Token" button</li>
            <li>Click the floating chat button at the bottom right</li>
            <li>Try sending a message to the AI assistant</li>
            <li>Verify that the message appears and the AI responds</li>
          </ol>
        </div>
      </div>

      {/* The ChatWidget is automatically included in the layout, but we're testing it here */}
      {isLoggedIn && <ChatWidget />}
    </div>
  );
}