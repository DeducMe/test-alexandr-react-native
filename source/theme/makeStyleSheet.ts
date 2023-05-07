import {StyleSheet} from 'react-native';
import useTheme from '../hooks/useTheme';

export type callbackType<T> = (
  theme: ReturnType<typeof useTheme>,
) => StyleSheet.NamedStyles<T>;

type makeStyleSheetReturnType<T> = () => StyleSheet.NamedStyles<T>;

export const makeStyleSheet = <T>(
  callback: callbackType<T>,
): makeStyleSheetReturnType<T> => {
  return () => {
    const theme = useTheme();
    return StyleSheet.create(callback(theme));
  };
};
