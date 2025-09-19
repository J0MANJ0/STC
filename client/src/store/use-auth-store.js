import { create } from 'zustand';
import { api } from '../lib/api';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';

const useAuth = create((set, get) => ({
  user: null,
  isCheckingAuth: true,
  isLoggingIn: false,
  isSigningUp: false,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const {
        data: { success, user },
      } = await api.get('/auth/check');

      success ? set({ user }) : set({ user: null });
    } catch (error) {
      console.log({ message: error.message });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const {
        data: { success, user, message },
      } = await api.post('/auth/signup', data);

      if (success) {
        set({ user });
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.log({ message: error.message });
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const {
        data: { success, user, message },
      } = await api.post('/auth/login', data);

      if (success) {
        set({ user });
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.log({ message: error.message });
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      const {
        data: { success, message },
      } = await api.post('/auth/logout');

      if (success) {
        set({ user: null });
        toast.success(message);
      }
    } catch (error) {
      console.log({ message: error.message });
      toast.error(error.response.data.message);
    }
  },
  updateProfile: async (data) => {
    try {
      const {
        data: { success, user, message },
      } = await api.put('/auth/update-profile', data);

      if (success) {
        set({ user });
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.log({ message: error.message });
      toast.error(error.response.data.message);
    }
  },
  connectSocket: () => {
    const { user } = get();

    if (!user || get().socket?.connected) return;

    const socket = io(import.meta.env.VITE_SERVER_URL, {
      withCredentials: true,
    });

    socket.connect();

    set({ socket });

    socket.on('onlineUsers', (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnect: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));

export default useAuth;
