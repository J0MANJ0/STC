import { Router } from 'express';
import {
  getChats,
  getContacts,
  getMessages,
  sendMessage,
} from '../controllers/message.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { arcjetProtection } from '../middlewares/arcjet.middleware.js';

const messageRouter = Router();

messageRouter.use(protect);

messageRouter.get('/contacts', getContacts);
messageRouter.get('/chats', getChats);
messageRouter.get('/:recipientId', getMessages);
messageRouter.post('/send/:recipientId', sendMessage);

messageRouter.get('/', (req, res) => {
  res.send('messages');
});

export default messageRouter;
