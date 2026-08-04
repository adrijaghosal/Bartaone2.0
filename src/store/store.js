import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { apiUtils } from '../utils/apiUtils';

// Store configuration
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

// Store initialization
export const initializeStore = () => {
  // Check for saved token and set auth header
  const token = localStorage.getItem('authToken');
  if (token) {
    apiUtils.setAuthToken(token);
  }
  
  // Check for saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }
  
  // Check for saved language
  const savedLanguage = localStorage.getItem('language');
  if (savedLanguage) {
    document.documentElement.lang = savedLanguage;
  }
  
  return store;
};

// Store reset function
export const resetStore = () => {
  store.dispatch({ type: 'RESET_STORE' });
};

export default store;