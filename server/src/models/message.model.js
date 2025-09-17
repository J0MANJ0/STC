import { Schema, model } from 'mongoose';

const messageSchema = new Schema(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    recipientId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    text: {
      type: String,
      trim: true,
      maxlength: 2000,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const MESSAGE = model('message', messageSchema);

export default MESSAGE;
