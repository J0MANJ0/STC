import { create } from 'zustand';
import { api } from '../lib/api';
import useAuth from './use-auth-store';

const useChat = create((set, get) => ({
  chats: [],
  contacts: [],
  messages: [],
  activeTab: 'chats',
  selectedUser: null,
  usersLoading: false,
  messagesLoading: false,
  soundEnabled: JSON.parse(localStorage.getItem('isSoundEnabled')) === true,

  toggleSound: () => {
    localStorage.setItem('isSoundEnabled', !get().soundEnabled);
    set({ soundEnabled: !get().soundEnabled });
  },

  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedUser: (user) => set({ selectedUser: user }),

  getContacts: async () => {
    set({ usersLoading: true });
    try {
      const {
        data: { success, contacts },
      } = await api.get('/messages/contacts');

      success && set({ contacts });
    } catch (error) {
      console.log(error.response.data.message);
    } finally {
      set({ usersLoading: false });
    }
  },

  getChats: async () => {
    set({ usersLoading: true });
    try {
      const {
        data: { success, chats },
      } = await api.get('/messages/chats');

      success && set({ chats });
    } catch (error) {
      console.log(error.response.data.message);
    } finally {
      set({ usersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ messagesLoading: true });
    try {
      const {
        data: { success, messages },
      } = await api.get(`/messages/${userId}`);

      success && set({ messages });
    } catch (error) {
      console.log(error.response.data.message);
    } finally {
      set({ messagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    const { user } = useAuth.getState();

    const tempId = `temp-${Date.now()}`;

    const optismisticMessage = {
      _id: tempId,
      senderId: user._id,
      recipientId: selectedUser._id,
      text: messageData.text,
      image: messageData.image,
      createdAt: new Date().toISOString(),
      isOptimistic: true,
    };

    set({ messages: [...messages, optismisticMessage] });
    try {
      const {
        data: { success, message },
      } = await api.post(`/messages/send/${selectedUser._id}`, messageData);

      success && set({ messages: messages.concat(message) });
    } catch (error) {
      set({ messages });
    }
  },
}));

export default useChat;
