export const colors = {
  // Monochrome Base
  black: '#000000',
  white: '#FFFFFF',
  gray: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },

  // Timeblock Colors (Translucent)
  timeblock: {
    blue: 'rgba(59, 130, 246, 0.15)',
    green: 'rgba(34, 197, 94, 0.15)',
    red: 'rgba(239, 68, 68, 0.15)',
    purple: 'rgba(168, 85, 247, 0.15)',
    yellow: 'rgba(234, 179, 8, 0.15)',
    orange: 'rgba(249, 115, 22, 0.15)',
    pink: 'rgba(236, 72, 153, 0.15)',
    teal: 'rgba(20, 184, 166, 0.15)',
  },

  // Border Colors (More Opaque)
  timeblockBorder: {
    blue: 'rgba(59, 130, 246, 0.3)',
    green: 'rgba(34, 197, 94, 0.3)',
    red: 'rgba(239, 68, 68, 0.3)',
    purple: 'rgba(168, 85, 247, 0.3)',
    yellow: 'rgba(234, 179, 8, 0.3)',
    orange: 'rgba(249, 115, 22, 0.3)',
    pink: 'rgba(236, 72, 153, 0.3)',
    teal: 'rgba(20, 184, 166, 0.3)',
  },
} as const;

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: '700' as const,
    lineHeight: 38,
    letterSpacing: -0.5,
    fontFamily: 'Inter-Bold',
  },
  h2: {
    fontSize: 24,
    fontWeight: '600' as const,
    lineHeight: 30,
    letterSpacing: -0.3,
    fontFamily: 'Inter-SemiBold',
  },
  h3: {
    fontSize: 18,
    fontWeight: '600' as const,
    lineHeight: 24,
    letterSpacing: -0.2,
    fontFamily: 'Inter-SemiBold',
  },
  body: { fontSize: 16, fontWeight: '400' as const, lineHeight: 22, fontFamily: 'Inter-Regular' },
  bodySmall: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
    fontFamily: 'Inter-Regular',
  },
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
    fontFamily: 'Inter-Regular',
  },
  timeLabel: {
    fontSize: 14,
    fontWeight: '500' as const,
    lineHeight: 18,
    fontFamily: 'Inter-Medium',
    color: colors.gray[500],
  },
  timeblockTitle: {
    fontSize: 15,
    fontWeight: '600' as const,
    lineHeight: 20,
    fontFamily: 'Inter-SemiBold',
  },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const layout = {
  screenPadding: 16,
  cardBorderRadius: 12,
  timeBlockBorderRadius: 8,
  inputBorderRadius: 8,
  hourHeight: 60, // pixels per hour on calendar
} as const;

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 8,
  },
} as const;

export const glassEffects = {
  modal: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    ...shadows.lg,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.08)',
    ...shadows.md,
  },
} as const;
