import { StyleSheet, Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';
import { typography } from '@/constants/design';
import { useColor } from '@/providers/colorProvider';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const { colors } = useColor();

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? [styles.link, { color: colors.accentText }] : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: typography.body,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: typography.body,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: typography.display,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: typography.title,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: typography.body,
  },
});
