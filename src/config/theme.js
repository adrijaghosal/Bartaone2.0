/**
 * Theme configuration for BartaOne
 * Includes dark/light themes, typography, spacing, and animations
 */

export const theme = {
  // Base theme settings
  base: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      serif: ['Merriweather', 'Georgia', 'serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    fontSize: {
      xs: '0.75rem',     // 12px
      sm: '0.875rem',    // 14px
      base: '1rem',      // 16px
      lg: '1.125rem',    // 18px
      xl: '1.25rem',     // 20px
      '2xl': '1.5rem',   // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
      '5xl': '3rem',     // 48px
      '6xl': '4rem',     // 64px
    },
    fontWeight: {
      thin: 100,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },
    spacing: {
      px: '1px',
      0: '0',
      0.5: '0.125rem',  // 2px
      1: '0.25rem',     // 4px
      1.5: '0.375rem',  // 6px
      2: '0.5rem',      // 8px
      2.5: '0.625rem',  // 10px
      3: '0.75rem',     // 12px
      3.5: '0.875rem',  // 14px
      4: '1rem',        // 16px
      5: '1.25rem',     // 20px
      6: '1.5rem',      // 24px
      7: '1.75rem',     // 28px
      8: '2rem',        // 32px
      9: '2.25rem',     // 36px
      10: '2.5rem',     // 40px
      11: '2.75rem',    // 44px
      12: '3rem',       // 48px
      14: '3.5rem',     // 56px
      16: '4rem',       // 64px
      20: '5rem',       // 80px
      24: '6rem',       // 96px
      28: '7rem',       // 112px
      32: '8rem',       // 128px
      36: '9rem',       // 144px
      40: '10rem',      // 160px
      44: '11rem',      // 176px
      48: '12rem',      // 192px
      52: '13rem',      // 208px
      56: '14rem',      // 224px
      60: '15rem',      // 240px
      64: '16rem',      // 256px
      72: '18rem',      // 288px
      80: '20rem',      // 320px
      96: '24rem',      // 384px
    },
  },

  // Dark theme
  dark: {
    background: {
      primary: '#0A1825',
      secondary: '#122840',
      tertiary: '#1A395A',
      card: '#1A395A',
      hover: '#224A75',
      overlay: 'rgba(10, 24, 37, 0.95)',
    },
    text: {
      primary: '#FDF8F2',
      secondary: '#7795B1',
      tertiary: '#5078A0',
      disabled: '#3A5A7A',
      inverse: '#0A1825',
    },
    border: {
      primary: 'rgba(230, 180, 115, 0.2)',
      secondary: 'rgba(230, 180, 115, 0.1)',
      hover: 'rgba(232, 131, 95, 0.3)',
    },
    shadow: {
      sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
      md: '0 4px 6px rgba(0, 0, 0, 0.3)',
      lg: '0 10px 15px rgba(0, 0, 0, 0.4)',
      xl: '0 20px 25px rgba(0, 0, 0, 0.5)',
      '2xl': '0 25px 50px rgba(0, 0, 0, 0.6)',
    },
    glass: {
      background: 'rgba(255, 255, 255, 0.05)',
      border: 'rgba(255, 255, 255, 0.1)',
      backdrop: 'blur(12px)',
    },
  },

  // Light theme
  light: {
    background: {
      primary: '#FDF8F2',
      secondary: '#FAF0E3',
      tertiary: '#F5E1C7',
      card: '#FFFFFF',
      hover: '#FAF0E3',
      overlay: 'rgba(253, 248, 242, 0.95)',
    },
    text: {
      primary: '#0A1825',
      secondary: '#5078A0',
      tertiary: '#7795B1',
      disabled: '#9EB3C7',
      inverse: '#FDF8F2',
    },
    border: {
      primary: 'rgba(42, 91, 143, 0.2)',
      secondary: 'rgba(42, 91, 143, 0.1)',
      hover: 'rgba(232, 131, 95, 0.3)',
    },
    shadow: {
      sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px rgba(0, 0, 0, 0.07)',
      lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
      xl: '0 20px 25px rgba(0, 0, 0, 0.15)',
      '2xl': '0 25px 50px rgba(0, 0, 0, 0.2)',
    },
    glass: {
      background: 'rgba(255, 255, 255, 0.8)',
      border: 'rgba(255, 255, 255, 0.2)',
      backdrop: 'blur(12px)',
    },
  },

  // Animations
  animations: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
      slower: '700ms',
    },
    easing: {
      ease: 'ease',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out',
      spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    keyframes: {
      fadeIn: {
        from: { opacity: 0 },
        to: { opacity: 1 },
      },
      fadeOut: {
        from: { opacity: 1 },
        to: { opacity: 0 },
      },
      slideUp: {
        from: { opacity: 0, transform: 'translateY(20px) scale(0.95)' },
        to: { opacity: 1, transform: 'translateY(0) scale(1)' },
      },
      slideDown: {
        from: { opacity: 0, transform: 'translateY(-10px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
      },
      scaleIn: {
        from: { opacity: 0, transform: 'scale(0.9)' },
        to: { opacity: 1, transform: 'scale(1)' },
      },
      shimmer: {
        '0%': { backgroundPosition: '200% 0' },
        '100%': { backgroundPosition: '-200% 0' },
      },
      pulse: {
        '0%, 100%': { opacity: 1 },
        '50%': { opacity: 0.5 },
      },
      bounce: {
        '0%, 100%': { transform: 'translateY(0)' },
        '50%': { transform: 'translateY(-10px)' },
      },
      spin: {
        from: { transform: 'rotate(0deg)' },
        to: { transform: 'rotate(360deg)' },
      },
    },
  },

  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Z-index layers
  zIndex: {
    auto: 'auto',
    '0': '0',
    '10': '10',
    '20': '20',
    '30': '30',
    '40': '40',
    '50': '50',
    modal: '100',
    overlay: '200',
    dropdown: '300',
    tooltip: '400',
    toast: '500',
    notification: '600',
  },

  // Border radius
  borderRadius: {
    none: '0',
    sm: '0.125rem',   // 2px
    base: '0.25rem',  // 4px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    '2xl': '1rem',    // 16px
    '3xl': '1.5rem',  // 24px
    full: '9999px',
  },

  // Opacity
  opacity: {
    '0': '0',
    '5': '0.05',
    '10': '0.1',
    '20': '0.2',
    '25': '0.25',
    '30': '0.3',
    '40': '0.4',
    '50': '0.5',
    '60': '0.6',
    '70': '0.7',
    '75': '0.75',
    '80': '0.8',
    '90': '0.9',
    '95': '0.95',
    '100': '1',
  },

  // Blur
  blur: {
    none: '0',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    '2xl': '24px',
    '3xl': '40px',
  },
};

// Theme utility functions
export const themeUtils = {
  /**
   * Get theme value
   */
  getTheme: (path, themeMode = 'dark') => {
    const parts = path.split('.');
    let value = theme[themeMode] || theme.dark;
    for (const part of parts) {
      if (value && typeof value === 'object' && part in value) {
        value = value[part];
      } else {
        return null;
      }
    }
    return value;
  },

  /**
   * Get animation configuration
   */
  getAnimation: (name) => {
    if (name in theme.animations.keyframes) {
      return theme.animations.keyframes[name];
    }
    return null;
  },

  /**
   * Get breakpoint value
   */
  getBreakpoint: (name) => {
    if (name in theme.breakpoints) {
      return theme.breakpoints[name];
    }
    return null;
  },

  /**
   * Get z-index value
   */
  getZIndex: (name) => {
    if (name in theme.zIndex) {
      return theme.zIndex[name];
    }
    return null;
  },

  /**
   * Get font family
   */
  getFontFamily: (name) => {
    if (name in theme.base.fontFamily) {
      return theme.base.fontFamily[name];
    }
    return null;
  },

  /**
   * Get font size
   */
  getFontSize: (name) => {
    if (name in theme.base.fontSize) {
      return theme.base.fontSize[name];
    }
    return null;
  },

  /**
   * Get spacing
   */
  getSpacing: (name) => {
    if (name in theme.base.spacing) {
      return theme.base.spacing[name];
    }
    return null;
  },

  /**
   * Get CSS variables for theme
   */
  getCssVariables: (themeMode = 'dark') => {
    const t = theme[themeMode] || theme.dark;
    const variables = {};
    
    // Background colors
    Object.entries(t.background).forEach(([key, value]) => {
      variables[`--bg-${key}`] = value;
    });
    
    // Text colors
    Object.entries(t.text).forEach(([key, value]) => {
      variables[`--text-${key}`] = value;
    });
    
    // Border colors
    Object.entries(t.border).forEach(([key, value]) => {
      variables[`--border-${key}`] = value;
    });
    
    // Shadow
    Object.entries(t.shadow).forEach(([key, value]) => {
      variables[`--shadow-${key}`] = value;
    });
    
    return variables;
  },

  /**
   * Get glass morphism styles
   */
  getGlassStyles: (themeMode = 'dark') => {
    const glass = theme[themeMode]?.glass || theme.dark.glass;
    return {
      background: glass.background,
      border: `1px solid ${glass.border}`,
      backdropFilter: glass.backdrop,
      WebkitBackdropFilter: glass.backdrop,
    };
  },

  /**
   * Get transition properties
   */
  getTransition: (properties = ['all'], duration = 'normal', easing = 'ease') => {
    const dur = theme.animations.duration[duration] || '300ms';
    const ease = theme.animations.easing[easing] || 'ease';
    return properties.map(p => `${p} ${dur} ${ease}`).join(', ');
  },
};

export default {
  theme,
  themeUtils,
};