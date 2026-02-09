/**
 * Frontend API Client - Production Ready
 *
 * Uses NEXT_PUBLIC_API_URL environment variable for backend URL.
 * All fetch calls include proper error handling and CORS-compatible headers.
 */

import { jwtDecode } from 'jwt-decode';

// =============================================================================
// API Configuration
// =============================================================================
// IMPORTANT: Set NEXT_PUBLIC_API_URL in Vercel environment variables
// Production fallback ensures the app works even if env var is missing

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://shezi1344-todo-chatbot-backend.hf.space';

// Log the API URL in development for debugging
if (typeof window !== 'undefined') {
  console.log('[API Client] Backend URL:', API_BASE_URL);
}

// =============================================================================
// Token Management
// =============================================================================

const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
};

const isTokenExpired = (token: string): boolean => {
  try {
    const decoded: { exp: number } = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    console.error('[API Client] Error decoding token:', error);
    return true;
  }
};

// =============================================================================
// Core API Request Function
// =============================================================================

const apiRequest = async (
  endpoint: string,
  options: RequestInit = {},
  requireAuth: boolean = true
): Promise<Response> => {
  // Handle authentication
  if (requireAuth) {
    const token = getToken();

    if (!token) {
      throw new Error('Authentication token not found. Please log in again.');
    }

    if (isTokenExpired(token)) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (typeof window !== 'undefined') {
        window.location.href = '/signin';
      }
      throw new Error('Session expired. Please log in again.');
    }

    options.headers = {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
    };
  }

  // Set Content-Type for JSON requests
  if (options.body && !(options.body instanceof FormData)) {
    options.headers = {
      ...options.headers,
      'Content-Type': 'application/json',
    };
  }

  // Build full URL - ensure no double slashes
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const fullUrl = `${API_BASE_URL}${cleanEndpoint}`;

  console.log(`[API Client] ${options.method || 'GET'} ${fullUrl}`);

  try {
    const response = await fetch(fullUrl, {
      ...options,
      // CORS settings - let browser handle credentials
      credentials: 'include',
    });

    // Handle 401 Unauthorized
    if (response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (typeof window !== 'undefined') {
        window.location.href = '/signin';
      }
      throw new Error('Unauthorized. Please log in again.');
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `HTTP error! Status: ${response.status}`);
    }

    return response;
  } catch (error) {
    // Handle network errors specifically
    if (error instanceof TypeError && error.message.includes('fetch')) {
      console.error('[API Client] Network error:', error);
      throw new Error(
        `Network error: Unable to connect to ${API_BASE_URL}. ` +
        'Please check if the backend is running and CORS is configured correctly.'
      );
    }
    throw error;
  }
};

// =============================================================================
// Chat API
// =============================================================================

export const createChatSession = async (userId: number) => {
  return {
    conversationId: Date.now(),
  };
};

export const sendMessage = async (
  message: string,
  userId: string,
  conversationId: number
) => {
  const response = await apiRequest(`/api/${userId}/chat`, {
    method: 'POST',
    body: JSON.stringify({
      message,
      conversation_id: conversationId || null,
    }),
  });

  return response.json();
};

export const getConversationHistory = async (
  userId: number,
  conversationId: number
) => {
  const response = await apiRequest(
    `/api/${userId}/conversations/${conversationId}/messages`
  );
  const data = await response.json();
  return data.messages;
};

// =============================================================================
// Task API
// =============================================================================

export const taskApi = {
  list: async (userId: string, status?: string, sort?: string) => {
    const params = new URLSearchParams();
    if (status && status !== 'all') params.append('status', status);
    if (sort) params.append('sort', sort);

    const queryString = params.toString();
    const endpoint = queryString
      ? `/api/${userId}/tasks?${queryString}`
      : `/api/${userId}/tasks`;

    const response = await apiRequest(endpoint);
    return response.json();
  },

  create: async (
    userId: string,
    data: { title: string; description?: string }
  ) => {
    const response = await apiRequest(`/api/${userId}/tasks`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.json();
  },

  get: async (userId: string, taskId: number) => {
    const response = await apiRequest(`/api/${userId}/tasks/${taskId}`);
    return response.json();
  },

  update: async (
    userId: string,
    taskId: number,
    data: { title?: string; description?: string; completed?: boolean }
  ) => {
    const response = await apiRequest(`/api/${userId}/tasks/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response.json();
  },

  delete: async (userId: string, taskId: number) => {
    const response = await apiRequest(`/api/${userId}/tasks/${taskId}`, {
      method: 'DELETE',
    });
    // DELETE returns 204 No Content
    if (response.status === 204) {
      return { success: true };
    }
    return response.json();
  },

  toggle: async (userId: string, taskId: number, completed: boolean) => {
    const response = await apiRequest(`/api/${userId}/tasks/${taskId}/complete`, {
      method: 'PATCH',
      body: JSON.stringify({ completed }),
    });
    return response.json();
  },
};

// =============================================================================
// Health Check (for debugging)
// =============================================================================

export const healthCheck = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  } catch (error) {
    console.error('[API Client] Health check failed:', error);
    throw new Error(`Backend health check failed: ${API_BASE_URL}/health`);
  }
};
