import { format } from 'date-fns';

interface MessageProps {
  message: {
    id: number;
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
  };
}

export default function Message({ message }: MessageProps) {
  const isUser = message.role === 'user';

  // Format the timestamp
  const formattedTime = format(new Date(message.timestamp), 'h:mm a');

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] rounded-lg px-4 py-2 ${
          isUser
            ? 'bg-yellow-400 text-black rounded-br-none'
            : 'bg-gray-700 text-white rounded-bl-none'
        }`}
      >
        <div className="whitespace-pre-wrap break-words">{message.content}</div>
        <div
          className={`text-xs mt-1 ${
            isUser ? 'text-black/70' : 'text-gray-300'
          }`}
        >
          {formattedTime}
        </div>
      </div>
    </div>
  );
}