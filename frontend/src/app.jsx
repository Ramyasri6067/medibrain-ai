import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
    setIsLoading(true);

    const API_URL = import.meta.env.VITE_API_URL || "https://primal-unwell-player.ngrok-free.dev";

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true" 
        },
        body: JSON.stringify({ message: userMessage }),
      });
      
      if (!response.ok) throw new Error("Server error");

      const data = await response.json();
      
      if (data.response) {
        setMessages(prev => [...prev, { text: data.response, isBot: true }]);
      }
    } catch (error) {
      console.error("Chat error:", error);
      // Removed the setMessages error call to keep the UI clean as requested
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>MediBrain AI</h1>
      <p>Your Intelligent Medical Assistant</p>
      
      <div className="chat-container">
        <div className="chat-window" style={{ flex: 1, overflowY: 'auto' }}>
          {messages.map((msg, index) => (
            <div key={index} className={msg.isBot ? 'bot-msg' : 'user-msg'}>
              {msg.text}
            </div>
          ))}
        </div>
        
        <form onSubmit={handleSubmit} className="input-area">
          <input 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder="Type your health question here..."
          />
          <button type="submit" disabled={isLoading}>Send</button>
        </form>
      </div>
    </div>
  );
}

export default App;