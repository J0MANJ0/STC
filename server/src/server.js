import express, { json, static as static_ } from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import 'dotenv/config';

// routes
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';

const app = express();

const __dirname = path.resolve();

// middlewares
app.use(json());
app.use(cookieParser());

// endpoints
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

const PORT = process.env.PORT;

if (process.env.NODE_ENV === 'production') {
  app.use(static_(path.join(__dirname, '../client/dist')));

  app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '../client', 'dist', 'index.html'));
  });
}

app.listen(PORT, () => console.log(`\nSERVER on http://localhost:${PORT}\n`));
