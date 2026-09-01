// src/store/store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import rootReducer from './rootReducer';
import { apiUtils } from '../utils/apiUtils';

// Import your individual slices (if you have them)
// import authSlice from './slices/authSlice';
// import userSlice from './slices/userSlice';
// import articleSlice from './slices/articleSlice';
// import notificationSlice from './slices/notificationSlice';
// import uiSlice from './slices/uiSlice';

// If you want to combine reducers here instead of using rootReducer
// const rootReducer = combineReducers({
//   auth: authSlice,
//   user: userSlice,
//   articles: articleSlice,
//   notifications: notificationSlice,
//   ui: uiSlice,
// });

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  // Whitelist: only these reducers will be persisted
  whitelist: ['auth', 'user'], // Add the reducers you want to persist
  // Blacklist: these reducers will NOT be persisted
  blacklist: ['notifications', 'ui'], // Add the reducers you don't want to persist
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store configuration with persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for serializable check
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

// Create persistor for redux-persist
export const persistor = persistStore(store);

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

// Export store as default
export default store;