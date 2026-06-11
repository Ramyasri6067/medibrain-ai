import express from 'express';
import cors from 'cors';
import { generateChatResponse } from './models/chat.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

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

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
app.get("/", (req, res) => {
  res.send("Backend is running successfully");
});