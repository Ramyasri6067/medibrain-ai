const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
    setIsLoading(true);

    // FIX: Add a fallback if VITE_API_URL is undefined
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
      } else {
        setMessages(prev => [...prev, { text: "Error: No response received.", isBot: true }]);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { text: "Error: Connection failed. Please check if your backend is running.", isBot: true }]);
    } finally {
      setIsLoading(false);
    }
  };
