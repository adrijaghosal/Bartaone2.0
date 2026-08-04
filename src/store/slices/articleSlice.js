import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import articleService from '../../services/articleService';

// Async thunks
export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async (params, { rejectWithValue }) => {
    try {
      const response = await articleService.getArticles(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchArticle = createAsyncThunk(
  'articles/fetchArticle',
  async (id, { rejectWithValue }) => {
    try {
      const response = await articleService.getArticle(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createArticle = createAsyncThunk(
  'articles/createArticle',
  async (articleData, { rejectWithValue }) => {
    try {
      const response = await articleService.createArticle(articleData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateArticle = createAsyncThunk(
  'articles/updateArticle',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await articleService.updateArticle(id, data);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteArticle = createAsyncThunk(
  'articles/deleteArticle',
  async (id, { rejectWithValue }) => {
    try {
      await articleService.deleteArticle(id);
      return { id };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchDrafts = createAsyncThunk(
  'articles/fetchDrafts',
  async (params, { rejectWithValue }) => {
    try {
      const response = await articleService.getDrafts(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const publishArticle = createAsyncThunk(
  'articles/publishArticle',
  async (id, { rejectWithValue }) => {
    try {
      const response = await articleService.publishArticle(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const saveDraft = createAsyncThunk(
  'articles/saveDraft',
  async (draftData, { rejectWithValue }) => {
    try {
      const response = await articleService.saveDraft(draftData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const likeArticle = createAsyncThunk(
  'articles/likeArticle',
  async (id, { rejectWithValue }) => {
    try {
      const response = await articleService.likeArticle(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const bookmarkArticle = createAsyncThunk(
  'articles/bookmarkArticle',
  async (id, { rejectWithValue }) => {
    try {
      const response = await articleService.bookmarkArticle(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const searchArticles = createAsyncThunk(
  'articles/searchArticles',
  async ({ query, params }, { rejectWithValue }) => {
    try {
      const response = await articleService.searchArticles(query, params);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTrending = createAsyncThunk(
  'articles/fetchTrending',
  async (params, { rejectWithValue }) => {
    try {
      const response = await articleService.getTrending(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchRecommended = createAsyncThunk(
  'articles/fetchRecommended',
  async (params, { rejectWithValue }) => {
    try {
      const response = await articleService.getRecommended(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  articles: [],
  currentArticle: null,
  drafts: [],
  bookmarks: [],
  loading: false,
  error: null,
  totalCount: 0,
  hasMore: false,
  categories: [],
  tags: [],
  trending: [],
  recommended: [],
  searchResults: [],
  searchQuery: '',
  filters: {
    category: 'all',
    sort: 'latest',
    status: 'all',
  },
};

// Slice
const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentArticle: (state) => {
      state.currentArticle = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = {
        category: 'all',
        sort: 'latest',
        status: 'all',
      };
    },
    clearSearch: (state) => {
      state.searchResults = [];
      state.searchQuery = '';
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch articles
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload.articles || [];
        state.totalCount = action.payload.total || 0;
        state.hasMore = action.payload.hasMore || false;
        state.error = null;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch single article
      .addCase(fetchArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.currentArticle = action.payload;
        state.error = null;
      })
      .addCase(fetchArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create article
      .addCase(createArticle.fulfilled, (state, action) => {
        state.articles = [action.payload, ...state.articles];
        state.totalCount += 1;
      })
      // Update article
      .addCase(updateArticle.fulfilled, (state, action) => {
        const index = state.articles.findIndex(a => a.id === action.payload.id);
        if (index !== -1) {
          state.articles[index] = action.payload;
        }
        if (state.currentArticle?.id === action.payload.id) {
          state.currentArticle = action.payload;
        }
      })
      // Delete article
      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.articles = state.articles.filter(a => a.id !== action.payload.id);
        state.totalCount -= 1;
        if (state.currentArticle?.id === action.payload.id) {
          state.currentArticle = null;
        }
      })
      // Fetch drafts
      .addCase(fetchDrafts.fulfilled, (state, action) => {
        state.drafts = action.payload.drafts || [];
      })
      // Publish article
      .addCase(publishArticle.fulfilled, (state, action) => {
        const index = state.articles.findIndex(a => a.id === action.payload.id);
        if (index !== -1) {
          state.articles[index] = action.payload;
        }
        state.drafts = state.drafts.filter(d => d.id !== action.payload.id);
      })
      // Save draft
      .addCase(saveDraft.fulfilled, (state, action) => {
        state.drafts = [action.payload, ...state.drafts];
      })
      // Like article
      .addCase(likeArticle.fulfilled, (state, action) => {
        const index = state.articles.findIndex(a => a.id === action.payload.id);
        if (index !== -1) {
          state.articles[index] = action.payload;
        }
        if (state.currentArticle?.id === action.payload.id) {
          state.currentArticle = action.payload;
        }
      })
      // Bookmark article
      .addCase(bookmarkArticle.fulfilled, (state, action) => {
        const index = state.articles.findIndex(a => a.id === action.payload.id);
        if (index !== -1) {
          state.articles[index] = action.payload;
        }
        if (state.currentArticle?.id === action.payload.id) {
          state.currentArticle = action.payload;
        }
        if (action.payload.isBookmarked) {
          state.bookmarks = [action.payload, ...state.bookmarks];
        } else {
          state.bookmarks = state.bookmarks.filter(b => b.id !== action.payload.id);
        }
      })
      // Search articles
      .addCase(searchArticles.fulfilled, (state, action) => {
        state.searchResults = action.payload.articles || [];
        state.totalCount = action.payload.total || 0;
      })
      // Fetch trending
      .addCase(fetchTrending.fulfilled, (state, action) => {
        state.trending = action.payload;
      })
      // Fetch recommended
      .addCase(fetchRecommended.fulfilled, (state, action) => {
        state.recommended = action.payload;
      });
  },
});

// Selectors
export const selectAllArticles = (state) => state.articles.articles;
export const selectCurrentArticle = (state) => state.articles.currentArticle;
export const selectArticlesLoading = (state) => state.articles.loading;
export const selectArticlesError = (state) => state.articles.error;
export const selectTotalArticles = (state) => state.articles.totalCount;
export const selectHasMoreArticles = (state) => state.articles.hasMore;
export const selectDrafts = (state) => state.articles.drafts;
export const selectBookmarks = (state) => state.articles.bookmarks;
export const selectCategories = (state) => state.articles.categories;
export const selectTags = (state) => state.articles.tags;
export const selectTrending = (state) => state.articles.trending;
export const selectRecommended = (state) => state.articles.recommended;
export const selectSearchResults = (state) => state.articles.searchResults;
export const selectSearchQuery = (state) => state.articles.searchQuery;
export const selectFilters = (state) => state.articles.filters;

// Actions
export const { 
  clearError, 
  clearCurrentArticle, 
  setFilters, 
  resetFilters,
  clearSearch,
  setSearchQuery 
} = articleSlice.actions;

export default articleSlice.reducer;