# Todo AI Chatbot UI

This is the frontend interface for the Todo AI Chatbot, built with Next.js and styled with a black and yellow theme.

## Features

- **Black & Yellow Theme**: Dark mode interface with yellow accents
- **Real-time Chat**: Interactive conversation with the AI assistant
- **Task Management**: Add, list, complete, and delete tasks using natural language
- **Secure Authentication**: JWT-based authentication with automatic token handling
- **Responsive Design**: Works on both desktop and mobile devices
- **Typing Indicators**: Shows when the AI is processing your request
- **Auto-scroll**: Automatically scrolls to the latest message

## Tech Stack

- Next.js 16+ (App Router)
- TypeScript
- Tailwind CSS
- date-fns (for date formatting)

## Environment Variables

Create a `.env.local` file in the frontend directory with the following variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_OPENAI_DOMAIN_KEY=your_openai_domain_key_here
BETTER_AUTH_SECRET=your_32_character_min_secret_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Components

### ChatWindow
Main chat interface that handles:
- Message history display
- Auto-scrolling to latest message
- Loading states
- Error handling

### Message
Displays individual messages with:
- Different styling for user vs assistant
- Timestamps
- Proper alignment

### InputArea
Handles user input with:
- Submit button
- Enter key support
- Disabled state during processing

## API Integration

The chatbot connects to the backend API at `/api/{user_id}/chat` and:
- Automatically attaches JWT tokens from localStorage
- Sends user messages to the AI backend
- Receives and displays AI responses
- Handles errors gracefully

## Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables (see above)

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Visit `http://localhost:3000/chatbot` to access the chatbot UI

## Deployment

Ready for deployment to Vercel or other Next.js hosting platforms. Simply connect your repository and configure the environment variables in your deployment platform.