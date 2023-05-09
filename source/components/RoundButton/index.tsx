import React from 'react';
import {
  ColorValue,
  Text,
  TouchableNativeFeedbackProps,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import {makeStyleSheet} from '../../theme/makeStyleSheet';
// import {  } from 'react-native-gesture-handler';

export interface IRoundButtonProps extends TouchableNativeFeedbackProps {
  onPress?: () => void;
  textColor?: ColorValue;
  title?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
}

const RoundButton: React.FC<IRoundButtonProps> = ({
  onPress,
  textColor,
  textStyle,
  title,
  style,
  disabled,
}) => {
  const styles = makeStyles();
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <View style={[styles.container, style]}>
        <Text style={[styles.textStyle, textStyle, {color: textColor}]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const makeStyles = makeStyleSheet(theme => ({
  container: {
    borderRadius: theme.space.xxs,
    backgroundColor: theme.colors.DEFAULT,
  },
  textStyle: {
    alignSelf: 'center',
    paddingHorizontal: theme.space.s,
    paddingVertical: theme.space.xxs,
    fontWeight: 'bold',
  },
}));

export {RoundButton};
