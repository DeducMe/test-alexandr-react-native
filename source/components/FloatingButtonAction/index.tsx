import React from 'react';
import {View, Text} from 'react-native';
import {makeStyleSheet} from '../../theme/makeStyleSheet';

const FloatingButtonAction: React.FC<IFloatingButtonActionProps> = ({
  icon,
  text,
}) => {
  const styles = makeStyle();
  return (
    <View key={Math.random() + ''} style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{text}</Text>
      </View>
      <View style={styles.iconContainer}>{icon}</View>
    </View>
  );
};

const makeStyle = makeStyleSheet(theme => ({
  container: {
    marginRight: -1 * theme.space.xxs,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    padding: theme.space.xs,
    textAlign: 'center',
  },
  textContainer: {
    backgroundColor: theme.colors.PRIMARY,
    minWidth: 120,
    paddingHorizontal: theme.space.xxs,
    paddingVertical: theme.space.xxxs,
    marginRight: theme.space.m,
    borderRadius: 10,
    ...theme.defaultShadow,
  },
  iconContainer: {
    backgroundColor: theme.colors.PRIMARY,
    padding: 13,
    borderRadius: 50,
    ...theme.defaultShadow,
  },
}));

export interface IFloatingButtonActionProps {
  icon: JSX.Element;
  text: string;
}
export default FloatingButtonAction;
