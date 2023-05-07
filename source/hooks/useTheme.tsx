import {Dimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const colors = {
  DEFAULT: '#DCDCDC',
  PRIMARY: '#E6ABDE',
  LABEL: '#FE2472',
  INFO: '#00BCD4',
  ERROR: '#F44336',
  SUCCESS: '#4CAF50',
  WARNING: '#FF9800',
  MUTED: '#979797',
  INPUT: '#DCDCDC',
  ACTIVE: '#9C26B0',
  BUTTON_COLOR: '#9C26B0',
  PLACEHOLDER: '#9FA5AA',
  SWITCH_ON: '#9C26B0',
  SWITCH_OFF: '#D4D9DD',
  GRADIENT_START: '#6B24AA',
  GRADIENT_END: '#15002B',
  PRICE_COLOR: '#EAD5FB',
  BORDER_COLOR: '#E7E7E7',
  BLOCK: '#E7E7E7',
  ICON: '#4A4A4A',
  BLACK: '#000000',
  GREY: '#808080',
  WHITE: '#FFFFFF',
  LIGHT_GREY: '#D5D5D5',

  // primary: '#0052D4',
  // secondary: '#FFD500',
  // background: '#F0F2F5',
  // white: '#FFFFFF',
  // black: '#000000',
  // grey: '#808080',
  // red: '#d40000',
  // lightGrey: '#d5d5d5',
  // border: '#000',
  // text: '#000',
};

const dimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
  bottomTabNavigationHeight: 70,
};

const fonts = {
  regular: {
    fontFamily: 'OpenSans-Italic',
  },
  bold: {
    fontFamily: 'OpenSans-Bold',
    fontWeight: 'bold',
  },
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

const borderRadius = {
  small: 4,
  medium: 8,
  large: 12,
};

const fontSizes = {
  small: 14,
  medium: 16,
  large: 20,
};

const defaultShadow = {
  elevation: 3,
  shadowColor: '#000000',
  shadowOffset: {height: 3, width: 0},
  shadowOpacity: 0.4,
  shadowRadius: 6,
};

export const useTheme = () => {
  const insets = useSafeAreaInsets();

  return {
    borderRadius,
    space,
    colors,
    fonts,
    fontSizes,
    dimensions,
    insets,
    defaultShadow,
  };
};

export default useTheme;
