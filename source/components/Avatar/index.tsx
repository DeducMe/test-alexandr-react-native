import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import useTheme from '../../hooks/useTheme';

export default function Avatar({
  avatar,
  onPress,
  disabled,
}: {
  avatar: string;
  onPress?: () => void;
  disabled?: boolean;
}) {
  const theme = useTheme();
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <Image
        source={{uri: avatar}}
        style={{
          height: 50,
          width: 50,
          borderRadius: theme.space.xxxl,
          marginRight: theme.space.s,
        }}
      />
    </TouchableOpacity>
  );
}
