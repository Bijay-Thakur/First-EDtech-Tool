import express from 'express';

const router = express.Router();

router.post('/', async (req, res) => {
  const { code, language, type } = req.body;

  // For now, we'll mock a response.
  console.log("Received code:", code);
  console.log("Language:", language);
  console.log("Type of analysis:", type);

  res.json({
    success: true,
    message: `Received your ${type} request for ${language} code.`,
    complexity: 'O(n log n)' // placeholder
  });
});

export default router;
