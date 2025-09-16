import { Router } from 'express';

const messageRouter = Router();

messageRouter.get('/', (req, res) => {
  res.send('messages');
});

export default messageRouter;
