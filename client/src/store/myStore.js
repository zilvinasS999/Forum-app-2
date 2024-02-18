import { create } from 'zustand';

const useStore = create((set) => ({
  error: null,
  success: null,
  setError: (error) => set({ error }),
  setSuccess: (success) => set({ success }),
  clearError: () => set({ error: null }),
  clearSuccess: () => set({ success: null }),
}));

export default useStore;
