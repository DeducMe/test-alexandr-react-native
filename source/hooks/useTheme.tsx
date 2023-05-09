import {useSafeAreaInsets} from 'react-native-safe-area-context';

const colors = {
  DEFAULT: '#DCDCDC',
  DEFAULT_LIGHT: '#FFFFFF',
  PRIMARY: '#286AE0',
  BUTTON_COLOR: '#9C26B0',
  BLACK: '#000000',
  GREY: '#808080',
};

const space = {
  xxxs: 2,
  xxs: 4,
  xs: 8,
  s: 12,
  m: 16,
  l: 20,
  xl: 24,
  xxl: 28,
  xxxl: 32,
  xxxxl: 36,
};

const fontSizes = {
  small: 14,
  medium: 16,
  large: 20,
};

const defaultShadow = {
  elevation: 2,
  shadowColor: '#000000',
  shadowOffset: {height: 3, width: 0},
  shadowOpacity: 0.2,
  shadowRadius: 6,
};

const iconSize = {
  s: 12,
  m: 20,
  l: 30,
  xl: 40,
};

export const useTheme = () => {
  const insets = useSafeAreaInsets();
  return {
    space,
    colors,
    insets,
    fontSizes,
    defaultShadow,
    iconSize,
  };
};

export default useTheme;
