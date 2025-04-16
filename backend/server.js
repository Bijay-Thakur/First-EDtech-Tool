import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/analyze', async (req, res) => {
  console.log("📦 Incoming Request Body:", req.body);
  const { messages, code, language, complexityType } = req.body;

  try {
    const systemMessage = {
      role: "system",
      content: `
You are BiTh AI 🤖, an interactive and friendly AI assistant who chats with users like a helpful coding buddy.
- If the user says hello or asks about you, reply casually and warmly.
- If they ask for help or send code, respond intelligently.
- If language or complexity type is missing, ask follow-up questions.
- Be clear and engaging — not robotic.
- Your tone is energetic and a bit playful, but never unprofessional.
      `.trim(),
    };

    const fullMessages = [systemMessage, ...(Array.isArray(messages) ? messages : [])]; // ✅ Safe fallback


    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      temperature: 0.8,
      messages: fullMessages,
    });

    const aiReply = completion.choices[0]?.message?.content;

    return res.json({
      reply: aiReply,
      inputMode: code ? 'code' : 'text',
      code,
      language,
      complexityType,
      showResult: !!(code && language && complexityType),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: 'Oops, something went wrong on my side.' });
  }
});

app.get('/', (req, res) => {
  res.send('🎉 BiTh AI backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
