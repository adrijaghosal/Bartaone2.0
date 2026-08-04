/**
 * Tailwind CSS color configuration for BartaOne
 * Navy, Warm Beige, and Terracotta design system
 */

export const colors = {
  // Navy Color Palette
  navy: {
    50: '#E8EDF2',
    100: '#C5D0DD',
    200: '#9EB3C7',
    300: '#7795B1',
    400: '#5078A0',
    500: '#2A5B8F',  // Primary Navy
    600: '#224A75',
    700: '#1A395A',
    800: '#122840',
    900: '#0A1825',
    950: '#060E16',
  },

  // Warm Beige Color Palette
  warmBeige: {
    50: '#FDF8F2',
    100: '#FAF0E3',
    200: '#F5E1C7',
    300: '#F0D2AB',
    400: '#EBC38F',
    500: '#E6B473',  // Primary Warm Beige
    600: '#DBA55F',
    700: '#CD944D',
    800: '#BF833B',
    900: '#B17229',
    950: '#8F5A1A',
  },

  // Terracotta Color Palette
  terracotta: {
    50: '#FDF5F2',
    100: '#FCE6DF',
    200: '#F9CDBF',
    300: '#F6B49F',
    400: '#F39B7F',
    500: '#E8835F',  // Primary Terracotta
    600: '#D66F4A',
    700: '#C45B35',
    800: '#B24720',
    900: '#A0330B',
    950: '#7A2608',
  },

  // Additional Colors
  success: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    200: '#BBF7D0',
    300: '#86EFAC',
    400: '#4ADE80',
    500: '#22C55E',
    600: '#16A34A',
    700: '#15803D',
    800: '#166534',
    900: '#14532D',
    950: '#0A2414',
  },

  warning: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
    950: '#451A03',
  },

  danger: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
    950: '#450A0A',
  },

  info: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
    950: '#172554',
  },

  // Neutral/Gray Colors
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
    950: '#030712',
  },

  // White & Black
  white: '#FFFFFF',
  black: '#000000',

  // Transparent
  transparent: 'transparent',

  // Current
  current: 'currentColor',
};

// Color utility functions
export const colorUtils = {
  /**
   * Get color value by path
   */
  getColor: (path) => {
    const parts = path.split('.');
    let value = colors;
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
   * Check if color exists
   */
  hasColor: (path) => {
    return colorUtils.getColor(path) !== null;
  },

  /**
   * Get all color shades for a color
   */
  getShades: (colorName) => {
    if (colorName in colors && typeof colors[colorName] === 'object') {
      return colors[colorName];
    }
    return null;
  },

  /**
   * Get color as CSS variable
   */
  toCssVar: (path) => {
    const value = colorUtils.getColor(path);
    if (value) {
      return `var(--color-${path.replace(/\./g, '-')})`;
    }
    return null;
  },

  /**
   * Get color as RGB
   */
  toRgb: (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    } : null;
  },

  /**
   * Get color as HSL
   */
  toHsl: (hex) => {
    const rgb = colorUtils.toRgb(hex);
    if (!rgb) return null;
    const { r, g, b } = rgb;
    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;
    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    const delta = max - min;
    let h = 0;
    let s = 0;
    let l = (max + min) / 2;

    if (delta !== 0) {
      s = delta / (1 - Math.abs(2 * l - 1));
      switch (max) {
        case rNorm:
          h = ((gNorm - bNorm) / delta) % 6;
          break;
        case gNorm:
          h = (bNorm - rNorm) / delta + 2;
          break;
        case bNorm:
          h = (rNorm - gNorm) / delta + 4;
          break;
      }
      h = Math.round(h * 60);
      if (h < 0) h += 360;
    }

    return {
      h: Math.round(h),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  },

  /**
   * Get contrast color (black or white)
   */
  getContrastColor: (hex) => {
    const rgb = colorUtils.toRgb(hex);
    if (!rgb) return '#FFFFFF';
    const { r, g, b } = rgb;
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
  },

  /**
   * Lighten a color
   */
  lighten: (hex, percent) => {
    const rgb = colorUtils.toRgb(hex);
    if (!rgb) return hex;
    const { r, g, b } = rgb;
    const amount = (percent / 100) * 255;
    const newR = Math.min(255, r + amount);
    const newG = Math.min(255, g + amount);
    const newB = Math.min(255, b + amount);
    return `#${[newR, newG, newB].map(c => Math.round(c).toString(16).padStart(2, '0')).join('')}`;
  },

  /**
   * Darken a color
   */
  darken: (hex, percent) => {
    const rgb = colorUtils.toRgb(hex);
    if (!rgb) return hex;
    const { r, g, b } = rgb;
    const amount = (percent / 100) * 255;
    const newR = Math.max(0, r - amount);
    const newG = Math.max(0, g - amount);
    const newB = Math.max(0, b - amount);
    return `#${[newR, newG, newB].map(c => Math.round(c).toString(16).padStart(2, '0')).join('')}`;
  },

  /**
   * Get primary color shades
   */
  getPrimaryShades: () => {
    return {
      50: colors.terracotta[50],
      100: colors.terracotta[100],
      200: colors.terracotta[200],
      300: colors.terracotta[300],
      400: colors.terracotta[400],
      500: colors.terracotta[500],
      600: colors.terracotta[600],
      700: colors.terracotta[700],
      800: colors.terracotta[800],
      900: colors.terracotta[900],
      950: colors.terracotta[950],
    };
  },

  /**
   * Get secondary color shades
   */
  getSecondaryShades: () => {
    return {
      50: colors.navy[50],
      100: colors.navy[100],
      200: colors.navy[200],
      300: colors.navy[300],
      400: colors.navy[400],
      500: colors.navy[500],
      600: colors.navy[600],
      700: colors.navy[700],
      800: colors.navy[800],
      900: colors.navy[900],
      950: colors.navy[950],
    };
  },

  /**
   * Get accent color shades
   */
  getAccentShades: () => {
    return {
      50: colors.warmBeige[50],
      100: colors.warmBeige[100],
      200: colors.warmBeige[200],
      300: colors.warmBeige[300],
      400: colors.warmBeige[400],
      500: colors.warmBeige[500],
      600: colors.warmBeige[600],
      700: colors.warmBeige[700],
      800: colors.warmBeige[800],
      900: colors.warmBeige[900],
      950: colors.warmBeige[950],
    };
  },
};

export default {
  colors,
  colorUtils,
};