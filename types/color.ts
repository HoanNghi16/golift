export interface colorType {
    background: string;
    surface: string;
    surfaceElevated: string;
    primary: string;
    primarySoft: string;
    accentText: string;
    onPrimary: string;
    onSurface: string;
    textPrimary: string;
    textSecondary: string;
    border: string;
    overlay: string;
    success: string;
    danger: string;
}

export type themeType = Record<string, {DARK_COLORS: colorType, LIGHT_COLORS: colorType}>
