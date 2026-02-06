'use client';

import { useState, KeyboardEvent } from 'react';

interface ChatInputProps {
  onSend: (input: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export default function ChatInput({ onSend, disabled = false, placeholder = "Type a message..." }: ChatInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = () => {
    if (inputValue.trim() && !disabled) {
      onSend(inputValue);
      setInputValue('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex items-center border border-gray-600 rounded-lg bg-gray-700 p-1">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none py-2 px-3 disabled:bg-gray-600 disabled:text-gray-400 resize-none max-h-32"
        autoComplete="off"
        spellCheck="false"
      />
      <button
        onClick={handleSubmit}
        disabled={disabled || !inputValue.trim()}
        className={`ml-1 px-3 py-2 rounded-md font-medium ${
          disabled || !inputValue.trim()
            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
            : 'bg-yellow-400 hover:bg-yellow-500 text-black cursor-pointer'
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
        </svg>
      </button>
    </div>
  );
}