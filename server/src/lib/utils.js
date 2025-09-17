import jwt from 'jsonwebtoken';
import { ENV } from './env.js';

export const generateToken = (userId, res) => {
  const { JWT_SECRET } = ENV;

  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: '7d',
  });

  res.cookie('stc', token, {
    maxAge: 7 * 24 * 3600000,
    httpOnly: true,
    sameSite: 'strict',
    secure: ENV.NODE_ENV === 'production',
  });

  return token;
};
