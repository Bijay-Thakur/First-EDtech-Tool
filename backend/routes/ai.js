import express from "express";
import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

//test route to verify connection
router.get("/test", (req, res) => {
  res.send("Hurray!!! Connected to OpenAI API");
  });



router.post("/analyze", async (req, res) => {
  const { code, language, option } = req.body;

  try {
    const prompt = `
Analyze the following ${language} code and provide the ${option} complexity.
Code:
${code}

Respond only with the analysis in a clear, short paragraph.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const result = completion.choices[0].message.content;
    res.json({ result });
  } catch (error) {
    console.error("AI error:", error.message);
    res.status(500).json({ error: "AI request failed" });
  }
});

export default router;
