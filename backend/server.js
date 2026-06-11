import express from 'express';
import cors from 'cors';
import { generateChatResponse } from './models/chat.js';

const app = express();
// Define the PORT variable (defaulting to 3000 if not specified in an .env file)
const PORT = process.env.PORT || 3000;

// Optimized CORS to allow connection from ngrok and clear headers
app.use(cors({
  origin: '*',
  credentials: true
}));

app.use(express.json());

// Main Chat Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Call the model/service to get the AI response
    const aiResponse = await generateChatResponse(message);
    
    res.json({ response: aiResponse });
  } catch (error) {
    console.error("Error in /api/chat:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Root Endpoint
app.get("/", (req, res) => {
  res.send("Backend is running successfully");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});