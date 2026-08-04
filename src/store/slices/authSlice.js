import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/authService';
import { apiUtils } from '../../utils/apiUtils';

// Async thunks
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password, rememberMe }, { rejectWithValue }) => {
    try {
      const response = await authService.login({ email, password });
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      }
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authService.register(userData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
      return {};
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const user = await authService.getCurrentUser();
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const user = await authService.updateProfile(profileData);
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateRole = createAsyncThunk(
  'auth/updateRole',
  async (role, { rejectWithValue }) => {
    try {
      const user = await authService.updateRole(role);
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (email, { rejectWithValue }) => {
    try {
      await authService.resetPassword(email);
      return { email };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const confirmResetPassword = createAsyncThunk(
  'auth/confirmResetPassword',
  async ({ token, newPassword }, { rejectWithValue }) => {
    try {
      await authService.confirmResetPassword(token, newPassword);
      return { success: true };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const token = await authService.refreshToken();
      return { token };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  token: localStorage.getItem('authToken') || null,
  permissions: [],
  rememberMe: localStorage.getItem('rememberMe') === 'true',
  twoFactorEnabled: false,
};

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('authToken', action.payload);
    },
    clearToken: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('authToken');
      localStorage.removeItem('rememberMe');
    },
    setRememberMe: (state, action) => {
      state.rememberMe = action.payload;
      if (action.payload) {
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('rememberMe');
      }
    },
    setTwoFactor: (state, action) => {
      state.twoFactorEnabled = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.permissions = action.payload.user?.permissions || [];
        state.error = null;
        if (state.rememberMe) {
          localStorage.setItem('authToken', action.payload.token);
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
      })
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.permissions = action.payload.user?.permissions || [];
        state.error = null;
        localStorage.setItem('authToken', action.payload.token);
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
      })
      // Logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.permissions = [];
        state.error = null;
        localStorage.removeItem('authToken');
        localStorage.removeItem('rememberMe');
      })
      .addCase(logout.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.permissions = [];
        localStorage.removeItem('authToken');
        localStorage.removeItem('rememberMe');
      })
      // Get current user
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.permissions = action.payload?.permissions || [];
        state.error = null;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = action.payload;
        localStorage.removeItem('authToken');
      })
      // Update profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update role
      .addCase(updateRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.permissions = action.payload?.permissions || [];
        state.error = null;
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Reset password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Confirm reset password
      .addCase(confirmResetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(confirmResetPassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(confirmResetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Refresh token
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.token = action.payload.token;
        localStorage.setItem('authToken', action.payload.token);
      });
  },
});

// Selectors
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;
export const selectAuthToken = (state) => state.auth.token;
export const selectPermissions = (state) => state.auth.permissions;
export const selectRememberMe = (state) => state.auth.rememberMe;
export const selectIsPublisher = (state) => state.auth.user?.role === 'publisher';
export const selectIsReader = (state) => state.auth.user?.role === 'reader';
export const selectIsAdmin = (state) => state.auth.user?.role === 'admin';

// Actions
export const { clearError, setToken, clearToken, setRememberMe, setTwoFactor } = authSlice.actions;

export default authSlice.reducer;