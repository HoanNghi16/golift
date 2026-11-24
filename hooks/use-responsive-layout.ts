import { getContentWidth, getLayoutScale, layout } from "@/constants/design";
import { useWindowDimensions } from "react-native";

export function useResponsiveLayout() {
  const { width, height, fontScale } = useWindowDimensions();
  return {
    width,
    height,
    fontScale,
    scale: getLayoutScale(width),
    contentWidth: getContentWidth(width),
    isCompact: width < layout.compactWidth || height < 680,
    isTablet: width >= layout.tabletWidth,
  };
}
