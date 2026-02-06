// frontend/src/types/chat.ts
export interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface ChatResponse {
  conversation_id: number;
  message_id: number;
  response: string;
  tool_calls: Array<any>; // Specific tool call types could be added here
  timestamp: string;
}