import express, { json } from 'express';
import 'dotenv/config';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';

const app = express();

// middlewares
app.use(express.json());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`\nSERVER on http://localhost:${PORT}\n`));
