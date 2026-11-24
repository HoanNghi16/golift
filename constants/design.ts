/** Shared layout tokens. Values are React Native logical pixels (dp). */
export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 999,
} as const;

export const typography = {
  caption: 12,
  footnote: 14,
  body: 16,
  bodyLarge: 18,
  title: 20,
  titleLarge: 24,
  display: 32,
} as const;

export const layout = {
  baseWidth: 390,
  compactWidth: 360,
  tabletWidth: 768,
  maxContentWidth: 600,
  tabBarHeight: 72,
  tabBarBottomSpacing: 12,
} as const;

/** Clamp width-based scaling so very small/large devices stay usable. */
export const getLayoutScale = (width: number) =>
  Math.max(0.88, Math.min(width / layout.baseWidth, 1.08));

export const getContentWidth = (width: number) =>
  Math.min(width, layout.maxContentWidth);

export const getTabBarContentInset = (scale: number, bottomInset: number) =>
  (layout.tabBarHeight + layout.tabBarBottomSpacing) * scale + bottomInset;
