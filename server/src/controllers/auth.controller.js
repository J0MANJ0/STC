import bcrypt from 'bcryptjs';
import USER from '../models/user.model.js';
import { generateToken } from '../lib/utils.js';
import { sendWelcome } from '../emails/email.handler.js';
import { ENV } from '../lib/env.js';
import cloudinary from '../lib/cloudinary.js';

export const signup = async (req, res) => {
  try {
    const {
      body: { fullName, password, email },
    } = req;

    if (!fullName || !email || !password)
      return res.status(400).json({
        success: false,
        message: 'Missing field(s)',
      });

    if (password.length < 6)
      return res.status(400).json({
        success: false,
        message: 'Password must be least 6 characters',
      });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email))
      return res.status(400).json({
        success: false,
        message: 'Invalid email format',
      });

    const existingUser = await USER.findOne({ email });

    if (existingUser)
      return res.status(400).json({
        success: false,
        message: 'Account already exists',
      });

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await USER.create({
      fullName,
      email,
      password: hashedPassword,
    });

    if (user) {
      generateToken(user._id, res);

      await sendWelcome(user.email, user.fullName, ENV.CLIENT_URL);

      return res.status(201).json({
        success: true,
        user,
        message: 'Account created successfully',
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid user data',
      });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const login = async (req, res) => {
  try {
    const {
      body: { email, password },
    } = req;

    if (!email || !password)
      return res.status(400).json({
        success: false,
        message: 'Missing field(s)',
      });

    if (password.length < 6)
      return res.status(400).json({
        success: false,
        message: 'Password must be least 6 characters',
      });

    const user = await USER.findOne({ email });

    if (!user)
      return res.status(404).json({
        success: false,
        message: 'Account not found',
      });

    const userPassword = await bcrypt.compare(password, user.password);

    if (!userPassword)
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials',
      });

    generateToken(user._id, res);

    return res.json({
      success: true,
      user,
      message: 'Login successful',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const logout = (_, res) => {
  try {
    res.clearCookie('stc');
    return res.json({
      success: true,
      message: 'Logged out',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const {
      body: { profilePic },
      user: { _id: userId },
    } = req;

    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    const user = await USER.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    return res.json({
      success: true,
      user,
      message: 'Profile updated successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
