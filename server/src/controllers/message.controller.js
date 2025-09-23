import USER from '../models/user.model.js';
import MESSAGE from '../models/message.model.js';
import cloudinary from '../lib/cloudinary.js';
import { getRecipientSocketId, io } from '../lib/socket.js';

export const getContacts = async (req, res) => {
  try {
    const {
      user: { _id: authUser },
    } = req;

    const contacts = await USER.find({ _id: { $ne: authUser } }).select(
      '-password'
    );

    return res.json({
      success: true,
      contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const {
      user: { _id: senderId },
      params: { recipientId },
    } = req;

    const messages = await MESSAGE.find({
      $or: [
        { senderId, recipientId },
        { senderId: recipientId, recipientId: senderId },
      ],
    });

    return res.json({
      success: true,
      messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getChats = async (req, res) => {
  try {
    const {
      user: { _id: authUser },
    } = req;

    const messages = await MESSAGE.find({
      $or: [{ senderId: authUser }, { recipientId: authUser }],
    });

    const chatsIds = [
      ...new Set(
        messages.map((msg) =>
          msg.senderId.toString() === authUser.toString()
            ? msg.recipientId.toString()
            : msg.senderId.toString()
        )
      ),
    ];

    const chats = await USER.find({ _id: { $in: chatsIds } }).select(
      '-password'
    );

    return res.json({
      success: true,
      chats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const {
      body: { text, image },
      params: { recipientId },
      user: { _id: senderId },
    } = req;

    if (!text && !image)
      return res.status(400).json({
        success: false,
        message: 'Text or image is required',
      });

    const recipient = await USER.exists({ _id: recipientId });

    if (!recipient)
      return res.status(404).json({
        success: false,
        message: 'Recipient not found',
      });

    let imageUrl;

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const message = await MESSAGE.create({
      senderId,
      recipientId,
      text,
      image: imageUrl,
    });

    const recipientSocketId = getRecipientSocketId(recipientId);

    if (recipientSocketId) {
      io.to(recipientSocketId).emit('newMessage', message);
    }

    return res.status(201).json({
      success: true,
      message,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
