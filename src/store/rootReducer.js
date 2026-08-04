import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import articleReducer from './slices/articleSlice';
import notificationReducer from './slices/notificationSlice';
import bookmarkReducer from './slices/bookmarkSlice';
import publisherReducer from './slices/publisherSlice';
import uiReducer from './slices/uiSlice';

// Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
  articles: articleReducer,
  notifications: notificationReducer,
  bookmarks: bookmarkReducer,
  publishers: publisherReducer,
  ui: uiReducer,
});

// Root reducer with reset functionality
export const resetRootReducer = (state, action) => {
  if (action.type === 'RESET_STORE') {
    // Reset all state
    return rootReducer(undefined, action);
  }
  return rootReducer(state, action);
};

// Selectors
export const selectRootState = (state) => state;
export const selectIsAppLoaded = (state) => 
  !state.auth.loading && 
  !state.articles.loading && 
  !state.bookmarks.loading;

// Type-safe selector helpers
export const createSelector = (selector) => selector;

export default resetRootReducer;