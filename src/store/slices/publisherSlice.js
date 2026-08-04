import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import publisherService from '../../services/publisherService';

// Async thunks
export const fetchPublishers = createAsyncThunk(
  'publishers/fetchPublishers',
  async (params, { rejectWithValue }) => {
    try {
      const response = await publisherService.getPublishers(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPublisher = createAsyncThunk(
  'publishers/fetchPublisher',
  async (id, { rejectWithValue }) => {
    try {
      const response = await publisherService.getPublisher(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updatePublisherProfile = createAsyncThunk(
  'publishers/updatePublisherProfile',
  async (data, { rejectWithValue }) => {
    try {
      const response = await publisherService.updateProfile(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const followPublisher = createAsyncThunk(
  'publishers/followPublisher',
  async (id, { rejectWithValue }) => {
    try {
      const response = await publisherService.followPublisher(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const unfollowPublisher = createAsyncThunk(
  'publishers/unfollowPublisher',
  async (id, { rejectWithValue }) => {
    try {
      const response = await publisherService.unfollowPublisher(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchFollowing = createAsyncThunk(
  'publishers/fetchFollowing',
  async (_, { rejectWithValue }) => {
    try {
      const response = await publisherService.getFollowing();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPublisherStats = createAsyncThunk(
  'publishers/fetchPublisherStats',
  async (id, { rejectWithValue }) => {
    try {
      const response = await publisherService.getStats(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  publishers: [],
  currentPublisher: null,
  following: [],
  loading: false,
  error: null,
  totalCount: 0,
  hasMore: false,
  stats: null,
  analytics: null,
  subscribers: [],
  earnings: null,
};

// Slice
const publisherSlice = createSlice({
  name: 'publishers',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentPublisher: (state) => {
      state.currentPublisher = null;
    },
    clearStats: (state) => {
      state.stats = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch publishers
      .addCase(fetchPublishers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPublishers.fulfilled, (state, action) => {
        state.loading = false;
        state.publishers = action.payload.publishers || [];
        state.totalCount = action.payload.total || 0;
        state.hasMore = action.payload.hasMore || false;
        state.error = null;
      })
      .addCase(fetchPublishers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch single publisher
      .addCase(fetchPublisher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPublisher.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPublisher = action.payload;
        state.error = null;
      })
      .addCase(fetchPublisher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update publisher profile
      .addCase(updatePublisherProfile.fulfilled, (state, action) => {
        state.currentPublisher = action.payload;
        const index = state.publishers.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.publishers[index] = action.payload;
        }
      })
      // Follow publisher
      .addCase(followPublisher.fulfilled, (state, action) => {
        state.following = [...state.following, action.payload.id];
        if (state.currentPublisher?.id === action.payload.id) {
          state.currentPublisher = { ...state.currentPublisher, isFollowing: true };
        }
      })
      // Unfollow publisher
      .addCase(unfollowPublisher.fulfilled, (state, action) => {
        state.following = state.following.filter(id => id !== action.payload.id);
        if (state.currentPublisher?.id === action.payload.id) {
          state.currentPublisher = { ...state.currentPublisher, isFollowing: false };
        }
      })
      // Fetch following
      .addCase(fetchFollowing.fulfilled, (state, action) => {
        state.following = action.payload.map(p => p.id);
      })
      // Fetch publisher stats
      .addCase(fetchPublisherStats.fulfilled, (state, action) => {
        state.stats = action.payload;
      });
  },
});

// Selectors
export const selectAllPublishers = (state) => state.publishers.publishers;
export const selectCurrentPublisher = (state) => state.publishers.currentPublisher;
export const selectFollowing = (state) => state.publishers.following;
export const selectPublishersLoading = (state) => state.publishers.loading;
export const selectPublishersError = (state) => state.publishers.error;
export const selectTotalPublishers = (state) => state.publishers.totalCount;
export const selectPublisherStats = (state) => state.publishers.stats;
export const selectIsFollowing = (state, id) => state.publishers.following.includes(id);

// Actions
export const { clearError, clearCurrentPublisher, clearStats } = publisherSlice.actions;

export default publisherSlice.reducer;