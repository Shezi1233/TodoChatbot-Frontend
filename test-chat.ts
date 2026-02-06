// Test script for chat functionality
console.log("Testing chat functionality...");

// Mock localStorage for testing
const mockLocalStorage = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };
})();

// Temporarily replace localStorage with mock for testing
Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

// Simulate a JWT token
localStorage.setItem('authToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJUZXN0IFVzZXIiLCJpYXQiOjE1MTYyMzkwMjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');

// Test the sendMessage function
async function testSendMessage() {
  try {
    console.log("Testing sendMessage function...");
    
    // Import the sendMessage function
    const { sendMessage } = await import('../lib/api');
    
    // Test with mock data
    const result = await sendMessage("Test message", 1, 0);
    console.log("sendMessage result:", result);
  } catch (error) {
    console.error("Error in sendMessage test:", error);
  }
}

// Run the test
testSendMessage();

// Test the ChatWidget component
async function testChatWidget() {
  console.log("Testing ChatWidget component...");
  
  // Import the component
  const ChatWidget = (await import('../components/chat/ChatWidget')).default;
  
  // Render the component (this is just to check if it loads without errors)
  if (ChatWidget) {
    console.log("ChatWidget component loaded successfully");
  } else {
    console.error("Failed to load ChatWidget component");
  }
}

// Run the component test
testChatWidget();

console.log("Test script completed.");