import { Server } from 'socket.io';
import http from 'http';
import express from 'express';
import { ENV } from './env.js';
import { socketProtect } from '../middlewares/socket.middleware.js';

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [ENV.CLIENT_URL],
    credentials: true,
  },
});

io.use(socketProtect);

export const getRecipientSocketId = (userId) => {
  return userSocketMap[userId];
};

const userSocketMap = {};

io.on('connection', (socket) => {
  const userId = socket.userId;

  io.emit('onlineUsers', Object.keys(userSocketMap));

  socket.on('disconnect', () => {
    delete userSocketMap[userId];
    io.emit('onlineUsers', Object.keys(userSocketMap));
  });
});

export { io, app, server };
