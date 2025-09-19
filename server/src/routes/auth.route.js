import { Router } from 'express';
import {
  login,
  logout,
  signup,
  updateProfile,
} from '../controllers/auth.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { arcjetProtection } from '../middlewares/arcjet.middleware.js';

const authRouter = Router();

// authRouter.use(arcjetProtection);

authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.put('/update-profile', protect, updateProfile);
authRouter.get('/check', protect, (_, res) =>
  res.json({ success: true, user: _.user })
);

export default authRouter;
