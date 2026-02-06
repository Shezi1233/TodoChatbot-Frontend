# TaskFlow AI Chat Widget

This project implements a floating AI chat widget for the TaskFlow application. The widget allows users to interact with an AI assistant to manage their tasks directly from any page.

## Features

- Floating chat button that appears on all pages
- Expandable chat window with TaskFlow branding (black and yellow theme)
- Real-time interaction with AI assistant
- Ability to add, delete, update, and list tasks via AI
- Responsive design for desktop and mobile
- JWT authentication integration
- Error handling and typing indicators

## Components

### ChatWidget
- Located at `src/components/chat/ChatWidget.tsx`
- Creates a floating button at the bottom right of the screen
- Toggles the chat window when clicked

### ChatWindow
- Located at `src/components/chat/ChatWindow.tsx`
- Implements the chat interface with message history
- Handles sending and receiving messages
- Includes typing indicators and error handling

### MessageBubble
- Located at `src/components/chat/MessageBubble.tsx`
- Displays individual messages with appropriate styling
- Differentiates between user and AI messages

### ChatInput
- Located at `src/components/chat/ChatInput.tsx`
- Provides input field and send button
- Handles keyboard shortcuts (Enter to send)

## Integration

The chat widget is integrated globally by adding `<ChatWidget />` to the main layout at `src/app/layout.tsx`. This ensures it appears on all pages of the application.

## API Integration

The chat functionality connects to the backend API using the `sendMessage` function from `src/lib/api.ts`. It requires:
- A valid JWT authentication token stored in localStorage
- The API endpoint configured in `NEXT_PUBLIC_API_URL`

## Styling

All components use Tailwind CSS classes that follow the TaskFlow branding:
- Primary color: Yellow (`bg-yellow-400`, `text-yellow-400`)
- Background: Black (`bg-black`)
- Text: White (`text-white`)
- Borders: Yellow (`border-yellow-600`)

## Testing

A test page is available at `/test-chat-widget` to verify functionality. This page includes:
- Authentication controls
- Instructions for testing
- Verification of widget appearance and functionality

## Environment Variables

Make sure to set the following environment variable:
- `NEXT_PUBLIC_API_URL`: The URL of your backend API server

Example in `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```