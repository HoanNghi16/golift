/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useColor } from '@/providers/colorProvider';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const { colors } = useColor();
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    switch (colorName) {
      case 'text': return colors.textPrimary;
      case 'background': return colors.background;
      case 'tint':
      case 'tabIconSelected': return colors.primary;
      case 'icon':
      case 'tabIconDefault': return colors.textSecondary;
    }
  }
}
