'use client';

import { useState, KeyboardEvent } from 'react';

interface InputAreaProps {
  onSend: (input: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export default function InputArea({ onSend, disabled = false, placeholder = "Type a message..." }: InputAreaProps) {
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
    <div className="flex items-end border border-gray-600 rounded-lg bg-gray-700 p-2">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className="flex-1 border-0 focus:ring-0 focus:outline-none py-2 px-3 text-white bg-gray-700 disabled:bg-gray-600 disabled:text-gray-400 resize-none max-h-32"
      />
      <button
        onClick={handleSubmit}
        disabled={disabled || !inputValue.trim()}
        className={`ml-2 px-4 py-2 rounded-md font-medium ${
          disabled || !inputValue.trim()
            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
            : 'bg-yellow-500 hover:bg-yellow-400 text-black cursor-pointer'
        }`}
      >
        Send
      </button>
    </div>
  );
}