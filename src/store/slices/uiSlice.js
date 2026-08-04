import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  theme: localStorage.getItem('theme') || 'dark',
  sidebarOpen: window.innerWidth >= 1024,
  mobileMenuOpen: false,
  modalOpen: false,
  modalContent: null,
  toast: {
    open: false,
    message: '',
    type: 'info',
    duration: 5000,
  },
  loadingOverlay: false,
  loadingText: '',
  searchOpen: false,
  notificationsOpen: false,
  userMenuOpen: false,
  language: localStorage.getItem('language') || 'en',
  fontSize: localStorage.getItem('fontSize') || 'medium',
  primaryColor: localStorage.getItem('primaryColor') || 'terracotta',
  reducedMotion: localStorage.getItem('reducedMotion') === 'true',
  highContrast: localStorage.getItem('highContrast') === 'true',
  viewMode: 'grid',
  sortBy: 'latest',
  filterCategory: 'all',
  filterStatus: 'all',
  filterType: 'all',
  activeTab: 'overview',
  currentPage: 1,
  itemsPerPage: 12,
  breadcrumbs: [],
  previousRoute: '/',
};

// Slice
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', state.theme);
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    setMobileMenuOpen: (state, action) => {
      state.mobileMenuOpen = action.payload;
    },
    openModal: (state, action) => {
      state.modalOpen = true;
      state.modalContent = action.payload || null;
    },
    closeModal: (state) => {
      state.modalOpen = false;
      state.modalContent = null;
    },
    showToast: (state, action) => {
      state.toast.open = true;
      state.toast.message = action.payload.message;
      state.toast.type = action.payload.type || 'info';
      state.toast.duration = action.payload.duration || 5000;
    },
    hideToast: (state) => {
      state.toast.open = false;
    },
    showLoadingOverlay: (state, action) => {
      state.loadingOverlay = true;
      state.loadingText = action.payload || 'Loading...';
    },
    hideLoadingOverlay: (state) => {
      state.loadingOverlay = false;
      state.loadingText = '';
    },
    toggleSearch: (state) => {
      state.searchOpen = !state.searchOpen;
    },
    setSearchOpen: (state, action) => {
      state.searchOpen = action.payload;
    },
    toggleNotifications: (state) => {
      state.notificationsOpen = !state.notificationsOpen;
    },
    setNotificationsOpen: (state, action) => {
      state.notificationsOpen = action.payload;
    },
    toggleUserMenu: (state) => {
      state.userMenuOpen = !state.userMenuOpen;
    },
    setUserMenuOpen: (state, action) => {
      state.userMenuOpen = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
      localStorage.setItem('language', action.payload);
    },
    setFontSize: (state, action) => {
      state.fontSize = action.payload;
      localStorage.setItem('fontSize', action.payload);
    },
    setPrimaryColor: (state, action) => {
      state.primaryColor = action.payload;
      localStorage.setItem('primaryColor', action.payload);
    },
    toggleReducedMotion: (state) => {
      state.reducedMotion = !state.reducedMotion;
      localStorage.setItem('reducedMotion', String(state.reducedMotion));
    },
    toggleHighContrast: (state) => {
      state.highContrast = !state.highContrast;
      localStorage.setItem('highContrast', String(state.highContrast));
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setFilterCategory: (state, action) => {
      state.filterCategory = action.payload;
    },
    setFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
    setFilterType: (state, action) => {
      state.filterType = action.payload;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
    },
    setBreadcrumbs: (state, action) => {
      state.breadcrumbs = action.payload;
    },
    addBreadcrumb: (state, action) => {
      state.breadcrumbs.push(action.payload);
    },
    clearBreadcrumbs: (state) => {
      state.breadcrumbs = [];
    },
    setPreviousRoute: (state, action) => {
      state.previousRoute = action.payload;
    },
    resetUI: () => initialState,
  },
});

// Selectors
export const selectTheme = (state) => state.ui.theme;
export const selectIsDark = (state) => state.ui.theme === 'dark';
export const selectIsLight = (state) => state.ui.theme === 'light';
export const selectSidebarOpen = (state) => state.ui.sidebarOpen;
export const selectMobileMenuOpen = (state) => state.ui.mobileMenuOpen;
export const selectModalOpen = (state) => state.ui.modalOpen;
export const selectModalContent = (state) => state.ui.modalContent;
export const selectToast = (state) => state.ui.toast;
export const selectLoadingOverlay = (state) => state.ui.loadingOverlay;
export const selectLoadingText = (state) => state.ui.loadingText;
export const selectSearchOpen = (state) => state.ui.searchOpen;
export const selectNotificationsOpen = (state) => state.ui.notificationsOpen;
export const selectUserMenuOpen = (state) => state.ui.userMenuOpen;
export const selectLanguage = (state) => state.ui.language;
export const selectFontSize = (state) => state.ui.fontSize;
export const selectPrimaryColor = (state) => state.ui.primaryColor;
export const selectReducedMotion = (state) => state.ui.reducedMotion;
export const selectHighContrast = (state) => state.ui.highContrast;
export const selectViewMode = (state) => state.ui.viewMode;
export const selectSortBy = (state) => state.ui.sortBy;
export const selectFilterCategory = (state) => state.ui.filterCategory;
export const selectFilterStatus = (state) => state.ui.filterStatus;
export const selectFilterType = (state) => state.ui.filterType;
export const selectActiveTab = (state) => state.ui.activeTab;
export const selectCurrentPage = (state) => state.ui.currentPage;
export const selectItemsPerPage = (state) => state.ui.itemsPerPage;
export const selectBreadcrumbs = (state) => state.ui.breadcrumbs;
export const selectPreviousRoute = (state) => state.ui.previousRoute;

// Actions
export const {
  toggleTheme,
  setTheme,
  toggleSidebar,
  setSidebarOpen,
  toggleMobileMenu,
  setMobileMenuOpen,
  openModal,
  closeModal,
  showToast,
  hideToast,
  showLoadingOverlay,
  hideLoadingOverlay,
  toggleSearch,
  setSearchOpen,
  toggleNotifications,
  setNotificationsOpen,
  toggleUserMenu,
  setUserMenuOpen,
  setLanguage,
  setFontSize,
  setPrimaryColor,
  toggleReducedMotion,
  toggleHighContrast,
  setViewMode,
  setSortBy,
  setFilterCategory,
  setFilterStatus,
  setFilterType,
  setActiveTab,
  setCurrentPage,
  setItemsPerPage,
  setBreadcrumbs,
  addBreadcrumb,
  clearBreadcrumbs,
  setPreviousRoute,
  resetUI,
} = uiSlice.actions;

export default uiSlice.reducer;