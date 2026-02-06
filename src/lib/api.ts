// frontend/src/lib/api.ts
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Helper function to get token from localStorage
const getToken = (): string | null => {
  // Try to get token from the auth context first, then fall back to localStorage
  const token = localStorage.getItem('token'); // Match the key used in auth.tsx
  return token;
};

// Helper function to check if token is expired
const isTokenExpired = (token: string): boolean => {
  try {
    const decoded: any = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
};

// Generic API request function with proper auth handling
const apiRequest = async (
  endpoint: string,
  options: RequestInit = {},
  requireAuth: boolean = true
) => {
  // Add auth header if required
  if (requireAuth) {
    const token = getToken();

    if (!token) {
      throw new Error('Authentication token not found. Please log in again.');
    }

    if (isTokenExpired(token)) {
      // Clear expired token and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/signin'; // Force redirect to login
      throw new Error('Session expired. Please log in again.');
    }

    // Add Authorization header
    options.headers = {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
    };
  }

  // Ensure Content-Type is set for requests that have a body
  if (options.body && !(options.body instanceof FormData)) {
    options.headers = {
      ...options.headers,
      'Content-Type': 'application/json',
    };
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

  // Handle 401 Unauthorized responses
  if (response.status === 401) {
    // Clear invalid token and redirect to login
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/signin';
    throw new Error('Unauthorized. Please log in again.');
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `HTTP error! Status: ${response.status}`);
  }

  return response;
};

// Create a new chat session
export const createChatSession = async (userId: number) => {
  try {
    // In a real implementation, you might need to make an API call to initialize a session
    // For now, we'll just return a placeholder
    return {
      conversationId: Date.now(), // This would come from the backend in a real implementation
    };
  } catch (error) {
    console.error('Error creating chat session:', error);
    throw error;
  }
};

// Send a message to the backend
export const sendMessage = async (message: string, userId: string, conversationId: number) => {
  try {
    const response = await apiRequest(`/api/${userId}/chat`, {
      method: 'POST',
      body: JSON.stringify({
        message,
        conversation_id: conversationId || null // Use null if conversationId is 0 or invalid
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error sending message:', error);

    // Handle different types of errors
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Network error: Unable to connect to the server. Please check your internet connection.');
    }

    throw error;
  }
};

// Get conversation history
export const getConversationHistory = async (userId: number, conversationId: number) => {
  try {
    const response = await apiRequest(`/api/${userId}/conversations/${conversationId}/messages`);

    const data = await response.json();
    return data.messages;
  } catch (error) {
    console.error('Error fetching conversation history:', error);
    throw error;
  }
};

// Task API functions
export const taskApi = {
  // List tasks
  list: async (userId: string, status?: string, sort?: string) => {
    const params = new URLSearchParams();
    if (status) params.append('status', status);
    if (sort) params.append('sort', sort);

    const response = await apiRequest(`/api/${userId}/tasks?${params}`);
    return response.json();
  },

  // Create task
  create: async (userId: string, data: { title: string; description?: string }) => {
    const response = await apiRequest(`/api/${userId}/tasks`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.json();
  },

  // Update task
  update: async (userId: string, taskId: number, data: { title?: string; description?: string }) => {
    const response = await apiRequest(`/api/${userId}/tasks/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response.json();
  },

  // Delete task
  delete: async (userId: string, taskId: number) => {
    const response = await apiRequest(`/api/${userId}/tasks/${taskId}`, {
      method: 'DELETE',
    });
    return response.json();
  },

  // Toggle task completion
  toggle: async (userId: string, taskId: number, completed: boolean) => {
    const response = await apiRequest(`/api/${userId}/tasks/${taskId}/complete`, {
      method: 'PATCH',
      body: JSON.stringify({ completed }),
    });
    return response.json();
  },
};