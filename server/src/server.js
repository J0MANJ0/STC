import { json, static as static_ } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import 'dotenv/config';

// routes
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';

// config
import connectDB from './lib/db.js';
import { ENV } from './lib/env.js';
import { app, server } from './lib/socket.js';

const __dirname = path.resolve();

// middlewares
app.use(json());
app.use(cookieParser());
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));

// endpoints
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

const PORT = ENV.PORT;

if (ENV.NODE_ENV === 'production') {
  app.use(static_(path.join(__dirname, '../client/dist')));

  app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '../client', 'dist', 'index.html'));
  });
}

connectDB().then(() => {
  server.listen(PORT, () =>
    console.log(`\nSERVER on http://localhost:${PORT}\n`)
  );
});
