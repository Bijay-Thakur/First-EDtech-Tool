import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import analyzeRoutes from './routes/analyze.js';
import aiRoutes from './routes/ai.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // to parse JSON

// Routes
app.use('/analyze', analyzeRoutes);
app.use('/api/ai', aiRoutes);

app.get('/', (req, res) => {
  res.send('AI EdTech Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
