import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

// Create Context
const ThemeContext = createContext();

// Custom hook
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Theme Provider
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'dark';
  });

  const [primaryColor, setPrimaryColor] = useState(() => {
    const savedColor = localStorage.getItem('primaryColor');
    return savedColor || 'terracotta';
  });

  const [fontSize, setFontSize] = useState(() => {
    const savedSize = localStorage.getItem('fontSize');
    return savedSize || 'medium';
  });

  const [reducedMotion, setReducedMotion] = useState(() => {
    const savedMotion = localStorage.getItem('reducedMotion');
    return savedMotion === 'true' || false;
  });

  const [highContrast, setHighContrast] = useState(() => {
    const savedContrast = localStorage.getItem('highContrast');
    return savedContrast === 'true' || false;
  });

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    
    // Remove previous theme classes
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
    
    // Apply color scheme
    if (theme === 'dark') {
      root.style.colorScheme = 'dark';
    } else {
      root.style.colorScheme = 'light';
    }
  }, [theme]);

  // Apply font size
  useEffect(() => {
    const root = document.documentElement;
    const sizes = {
      small: '14px',
      medium: '16px',
      large: '18px',
      xlarge: '20px',
    };
    root.style.fontSize = sizes[fontSize] || '16px';
    localStorage.setItem('fontSize', fontSize);
  }, [fontSize]);

  // Apply reduced motion
  useEffect(() => {
    const root = document.documentElement;
    if (reducedMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }
    localStorage.setItem('reducedMotion', String(reducedMotion));
  }, [reducedMotion]);

  // Apply high contrast
  useEffect(() => {
    const root = document.documentElement;
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    localStorage.setItem('highContrast', String(highContrast));
  }, [highContrast]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }, []);

  const setThemeMode = useCallback((mode) => {
    if (['dark', 'light'].includes(mode)) {
      setTheme(mode);
    }
  }, []);

  const setPrimaryColorMode = useCallback((color) => {
    const validColors = ['terracotta', 'navy', 'beige', 'blue', 'green', 'purple', 'pink', 'orange'];
    if (validColors.includes(color)) {
      setPrimaryColor(color);
      localStorage.setItem('primaryColor', color);
    }
  }, []);

  const setFontSizeMode = useCallback((size) => {
    const validSizes = ['small', 'medium', 'large', 'xlarge'];
    if (validSizes.includes(size)) {
      setFontSize(size);
    }
  }, []);

  const toggleReducedMotion = useCallback(() => {
    setReducedMotion(prev => !prev);
  }, []);

  const toggleHighContrast = useCallback(() => {
    setHighContrast(prev => !prev);
  }, []);

  // Color palette based on primary color
  const getColorPalette = useCallback(() => {
    const colors = {
      terracotta: {
        primary: '#E8835F',
        primaryDark: '#D66F4A',
        primaryLight: '#F39B7F',
        secondary: '#2A5B8F',
        accent: '#E6B473',
      },
      navy: {
        primary: '#2A5B8F',
        primaryDark: '#224A75',
        primaryLight: '#5078A0',
        secondary: '#E8835F',
        accent: '#E6B473',
      },
      beige: {
        primary: '#E6B473',
        primaryDark: '#CD944D',
        primaryLight: '#F0D2AB',
        secondary: '#2A5B8F',
        accent: '#E8835F',
      },
      blue: {
        primary: '#4A90D9',
        primaryDark: '#357ABD',
        primaryLight: '#6BA8E0',
        secondary: '#E8835F',
        accent: '#E6B473',
      },
      green: {
        primary: '#4CAF50',
        primaryDark: '#388E3C',
        primaryLight: '#66BB6A',
        secondary: '#2A5B8F',
        accent: '#E6B473',
      },
      purple: {
        primary: '#7B61FF',
        primaryDark: '#5E44D9',
        primaryLight: '#9B83FF',
        secondary: '#E8835F',
        accent: '#E6B473',
      },
      pink: {
        primary: '#E67E9A',
        primaryDark: '#D45A7A',
        primaryLight: '#EDA0B6',
        secondary: '#2A5B8F',
        accent: '#E6B473',
      },
      orange: {
        primary: '#F5A623',
        primaryDark: '#D4891A',
        primaryLight: '#F7B84A',
        secondary: '#2A5B8F',
        accent: '#E8835F',
      },
    };
    return colors[primaryColor] || colors.terracotta;
  }, [primaryColor]);

  // Get CSS variables for theme
  const getThemeVariables = useCallback(() => {
    const palette = getColorPalette();
    return {
      '--color-primary': palette.primary,
      '--color-primary-dark': palette.primaryDark,
      '--color-primary-light': palette.primaryLight,
      '--color-secondary': palette.secondary,
      '--color-accent': palette.accent,
    };
  }, [getColorPalette]);

  const value = {
    theme,
    setTheme: setThemeMode,
    toggleTheme,
    primaryColor,
    setPrimaryColor: setPrimaryColorMode,
    fontSize,
    setFontSize: setFontSizeMode,
    reducedMotion,
    toggleReducedMotion,
    highContrast,
    toggleHighContrast,
    getColorPalette,
    getThemeVariables,
    isDark: theme === 'dark',
    isLight: theme === 'light',
  };

  return (
    <ThemeContext.Provider value={value}>
      <div style={getThemeVariables()}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export default ThemeContext;