import useTheme from '../../hooks/useTheme';
import {IconPack, getIcon} from './getIcon';

import React from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';

type Props = {
  name: string;
  color?: string;
  size: number;
  iconSet: IconPack;
  style?: StyleProp<ViewStyle>;
};

const IconComponent = ({
  name,
  color,
  size,
  iconSet = 'MaterialIcons',
  style,
}: Props) => {
  const theme = useTheme();
  const styles = makeStyles(theme);

  const IconSet = getIcon(iconSet);
  return (
    <View style={[styles.iconContainer, style]}>
      <IconSet name={name} color={color} size={size} />
    </View>
  );
};

const makeStyles = (theme: any) =>
  StyleSheet.create({
    iconContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default IconComponent;
