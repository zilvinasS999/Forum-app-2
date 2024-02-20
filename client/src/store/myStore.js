import { create } from 'zustand';

export const useErrStore = create((set) => ({
  error: null,
  success: null,
  setError: (error) => {
    console.log('Setting error:', error);
    set({ error });
  },
  setSuccess: (success) => set({ success }),
  clearError: () => set({ error: null }),
  clearSuccess: () => set({ success: null }),
}));

export const useAuthStore = create((set) => ({
  username: localStorage.getItem('username') || null,
  token: localStorage.getItem('token') || null,
  isLoggedIn: Boolean(localStorage.getItem('token')),
  autoLoginEnabled: false,
  setToken: (token) => {
    localStorage.setItem('token', token);
    set({ token, isLoggedIn: true });
  },
  setUsername: (username) => {
    localStorage.setItem('username', username);
    set({ username });
  },
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  setAutoLoginEnabled: (enabled) => {
    localStorage.setItem('autologin', enabled ? 'true' : 'false');
    set({ autoLoginEnabled: enabled });
  },
  setUserInfo: ({ username, token, role }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    localStorage.setItem('role', role);
    set({ token, username, role, isLoggedIn: true });
  },
  // attemptAutoLogin: () => {
  //   console.log('Attempting to auto-login');
  //   const autoLoginEnabled = localStorage.getItem('autologin') === 'true';
  //   const token = localStorage.getItem('token');
  //   const username = localStorage.getItem('username');
  //   console.log('Auto-login enabled:', autoLoginEnabled);
  //   console.log('Token found:', token);

  //   if (token && username) {
  //     set({ isLoggedIn: true, token, username });
  //     console.log('Auto-login successful.');
  //   } else {
  //     console.log('No token found, auto-login failed.');
  //   }
  // },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('autologin');
    localStorage.removeItem('role');
    set({
      isLoggedIn: false,
      token: null,
      username: null,
      role: null,
      autoLoginEnabled: false,
    });
    window.location.href = '/login';
  },
}));

export const useProfileStore = create((set) => ({
  userProfile: null,
  setUserProfile: (profile) => set({ userProfile: profile }),
  fetchUserProfile: async (userId, token) => {
    try {
      const response = await fetch(`http://localhost:2400/users/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
      const data = await response.json();
      console.log('Fetched user profile:', data);
      if (data.success) {
        set({ userProfile: data.data.userProfile });
      } else {
        console.error('Failed to fetch user profile:', data.message);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  },
  updateUserImage: async (newImageUrl, token) => {
    try {
      console.log('Sending token:', token);
      const response = await fetch(`http://localhost:2400/user/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({ newImage: newImageUrl }),
      });
      const data = await response.json();
      if (data.success) {
        set((state) => ({
          userProfile: {
            ...state.userProfile,
            image: newImageUrl,
          },
        }));
      } else {
        console.error('Failed to update profile image:', data.message);
      }
    } catch (error) {
      console.error('Error updating profile image:', error);
    }
  },
}));

export const useForumStore = create((set) => ({
  topics: [],
  setTopics: (topics) => set({ topics }),
  fetchTopics: async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Authorization header:', token);
      console.log('Token received:', token);
      const response = await fetch('http://localhost:2400/topics', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
      const data = await response.json();
      if (response.ok && data.success) {
        set({ topics: data.data });
      } else {
        console.error('Failed to fetch topics:', data.message);
      }
    } catch (error) {
      console.error('Error fetching topics:', error);
    }
  },
  createTopic: async (topicData, token) => {
    try {
      console.log('Sending request to create topic with data:', topicData);
      const response = await fetch('http://localhost:2400/topics', {
        method: 'POST', // or whatever your method is
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(topicData),
      });
      const data = await response.json();
      console.log('Response received:', data);

      if (response.ok && data.success) {
        return { success: true };
      } else {
        console.error('Failed to create topic:', data.message);
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Error creating topic:', error);
      return { success: false, message: error.message };
    }
  },
}));
