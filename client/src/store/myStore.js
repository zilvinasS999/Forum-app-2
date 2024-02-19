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
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  setAutoLoginEnabled: (enabled) => {
    localStorage.setItem('autologin', enabled ? 'true' : 'false');
    set({ autoLoginEnabled: enabled });
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
    set({
      isLoggedIn: false,
      token: null,
      username: null,
      autoLoginEnabled: false,
    });
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
      if (data.success) {
        set({ userProfile: data.data.userProfile });
      } else {
        console.error('Failed to fetch user profile:', data.message);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  },
}));
