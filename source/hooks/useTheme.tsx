import {Dimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const colors = {
  DEFAULT: '#DCDCDC',
  PRIMARY: '#9C26B0',
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

const spacing = {
  small: 8,
  medium: 16,
  large: 24,
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

export const useTheme = () => {
  const insets = useSafeAreaInsets();

  return {
    borderRadius,
    spacing,
    colors,
    fonts,
    fontSizes,
    dimensions,
    insets,
  };
};

export default useTheme;
