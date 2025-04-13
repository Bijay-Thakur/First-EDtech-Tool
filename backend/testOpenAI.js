import { OpenAI } from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Load your API key from .env
});

async function testConnection() {
  try {
    const models = await openai.models.list();
    console.log("✅ OpenAI connection successful. Available models:");
    models.data.forEach((model) => console.log(model.id));
  } catch (error) {
    console.error("❌ Error connecting to OpenAI:", error.message);
  }
}

testConnection();
