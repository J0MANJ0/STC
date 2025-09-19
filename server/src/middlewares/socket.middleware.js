import jwt from 'jsonwebtoken';
import USER from '../models/user.model.js';
import { ENV } from '../lib/env.js';

export const socketProtect = async (socket, next) => {
  try {
    const token = socket.handshake.headers.cookie
      ?.split('; ')
      .find((row) => row.startsWith('stc='))
      ?.split('=')[1];

    if (!token) return next(new Error('Unauthorized'));

    const decoded = jwt.verify(token, ENV.JWT_SECRET);

    if (!decoded) return next(new Error('Unauthorized'));

    const user = await USER.findById(decoded.userId).select('-password');

    if (!user) return next(new Error('User not found'));

    socket.user = user;
    socket.userId = user._id.toString();

    next();
  } catch (error) {
    next(new Error('Unauthorized'));
  }
};
