import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import bookmarkService from '../../services/bookmarkService';

// Async thunks
export const fetchBookmarks = createAsyncThunk(
  'bookmarks/fetchBookmarks',
  async (params, { rejectWithValue }) => {
    try {
      const response = await bookmarkService.getBookmarks(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addBookmark = createAsyncThunk(
  'bookmarks/addBookmark',
  async ({ articleId, folderId }, { rejectWithValue }) => {
    try {
      const response = await bookmarkService.addBookmark(articleId, folderId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeBookmark = createAsyncThunk(
  'bookmarks/removeBookmark',
  async (id, { rejectWithValue }) => {
    try {
      await bookmarkService.removeBookmark(id);
      return { id };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createFolder = createAsyncThunk(
  'bookmarks/createFolder',
  async ({ name, description }, { rejectWithValue }) => {
    try {
      const response = await bookmarkService.createFolder(name, description);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateFolder = createAsyncThunk(
  'bookmarks/updateFolder',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await bookmarkService.updateFolder(id, data);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteFolder = createAsyncThunk(
  'bookmarks/deleteFolder',
  async (id, { rejectWithValue }) => {
    try {
      await bookmarkService.deleteFolder(id);
      return { id };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const moveBookmark = createAsyncThunk(
  'bookmarks/moveBookmark',
  async ({ bookmarkId, folderId }, { rejectWithValue }) => {
    try {
      const response = await bookmarkService.moveBookmark(bookmarkId, folderId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const searchBookmarks = createAsyncThunk(
  'bookmarks/searchBookmarks',
  async ({ query, params }, { rejectWithValue }) => {
    try {
      const response = await bookmarkService.searchBookmarks(query, params);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  bookmarks: [],
  folders: [],
  currentFolder: null,
  loading: false,
  error: null,
  totalCount: 0,
  hasMore: false,
  searchResults: [],
  searchQuery: '',
};

// Slice
const bookmarkSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentFolder: (state, action) => {
      state.currentFolder = action.payload;
    },
    clearSearch: (state) => {
      state.searchResults = [];
      state.searchQuery = '';
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    clearBookmarks: (state) => {
      state.bookmarks = [];
      state.totalCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch bookmarks
      .addCase(fetchBookmarks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookmarks.fulfilled, (state, action) => {
        state.loading = false;
        state.bookmarks = action.payload.bookmarks || [];
        state.folders = action.payload.folders || [];
        state.totalCount = action.payload.total || 0;
        state.hasMore = action.payload.hasMore || false;
        state.error = null;
      })
      .addCase(fetchBookmarks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add bookmark
      .addCase(addBookmark.fulfilled, (state, action) => {
        state.bookmarks = [action.payload, ...state.bookmarks];
        state.totalCount += 1;
      })
      // Remove bookmark
      .addCase(removeBookmark.fulfilled, (state, action) => {
        state.bookmarks = state.bookmarks.filter(b => b.id !== action.payload.id);
        state.totalCount = Math.max(0, state.totalCount - 1);
      })
      // Create folder
      .addCase(createFolder.fulfilled, (state, action) => {
        state.folders = [action.payload, ...state.folders];
      })
      // Update folder
      .addCase(updateFolder.fulfilled, (state, action) => {
        const index = state.folders.findIndex(f => f.id === action.payload.id);
        if (index !== -1) {
          state.folders[index] = action.payload;
        }
      })
      // Delete folder
      .addCase(deleteFolder.fulfilled, (state, action) => {
        state.folders = state.folders.filter(f => f.id !== action.payload.id);
        if (state.currentFolder === action.payload.id) {
          state.currentFolder = null;
        }
      })
      // Move bookmark
      .addCase(moveBookmark.fulfilled, (state, action) => {
        const index = state.bookmarks.findIndex(b => b.id === action.payload.id);
        if (index !== -1) {
          state.bookmarks[index] = action.payload;
        }
      })
      // Search bookmarks
      .addCase(searchBookmarks.fulfilled, (state, action) => {
        state.searchResults = action.payload;
      });
  },
});

// Selectors
export const selectAllBookmarks = (state) => state.bookmarks.bookmarks;
export const selectFolders = (state) => state.bookmarks.folders;
export const selectCurrentFolder = (state) => state.bookmarks.currentFolder;
export const selectBookmarksLoading = (state) => state.bookmarks.loading;
export const selectBookmarksError = (state) => state.bookmarks.error;
export const selectTotalBookmarks = (state) => state.bookmarks.totalCount;
export const selectHasMoreBookmarks = (state) => state.bookmarks.hasMore;
export const selectSearchResults = (state) => state.bookmarks.searchResults;
export const selectSearchQuery = (state) => state.bookmarks.searchQuery;

// Actions
export const {
  clearError,
  setCurrentFolder,
  clearSearch,
  setSearchQuery,
  clearBookmarks,
} = bookmarkSlice.actions;

export default bookmarkSlice.reducer;