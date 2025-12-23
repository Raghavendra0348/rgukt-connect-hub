#!/usr/bin/env node
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3002;

console.log('🧩 Frontend helper server starting...');

app.use(express.json());

// Lightweight health endpoint used only for dev convenience
app.get('/__frontend_health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Informative fallback for API routes — avoid crashing if backend isn't run here
app.use('/api', (req, res) => {
  res.status(502).json({
    error: 'API proxy not configured in frontend server.',
    message: 'Start the backend (see /backend) on http://localhost:3001 or configure a proxy.'
  });
});

// Fallback route
app.get('*', (req, res) => {
  res.status(200).send('Frontend helper server is running. Vite serves the app separately.');
});

app.listen(PORT, () => {
  console.log(`🟢 Frontend helper server listening on http://localhost:${PORT}`);
});
