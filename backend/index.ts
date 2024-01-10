import cors from 'cors';
import express from 'express';
import NodeCache from 'node-cache';

import anagramRoutes from './routes/anagram';
import dictionaryRoutes from './routes/dictionary';

// Express init
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Anagram route
app.use('/api/anagram', anagramRoutes);
// Dictionary route
app.use('/api/dictionary', dictionaryRoutes);

// Bad Request
app.use((req, res) => {
  res.status(400).json({
    id: 400,
    status: 400,
    code: 'BAD_REQUEST',
    title: 'Bad Request',
  });
});

// Express go live
if (process.env.NODE_ENV !== 'test') {
  app.listen(3000, () => {
    console.log(`Anagram Factory API listening on port 3000...`);
  });
}

// Server cache init
export const serverCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

export default app;
