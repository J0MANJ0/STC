import jwt from 'jsonwebtoken';
import USER from '../models/user.model.js';
import { ENV } from '../lib/env.js';

export const protect = async (req, res, next) => {
  try {
    const {
      cookies: { stc },
    } = req;

    if (!stc)
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });

    const decoded = jwt.verify(stc, ENV.JWT_SECRET);

    if (!decoded)
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });

    const user = await USER.findById(decoded.userId).select('-password');

    if (!user)
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });

    req.user = user;

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};
