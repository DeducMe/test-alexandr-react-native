import {View, Text, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import React, {useContext} from 'react';
import useTheme from '../../hooks/useTheme';
import {AppContext} from '../../providers/AppProvider';
import {useNavigation} from '@react-navigation/native';

export default function ChatListScreen() {
  const theme = useTheme();
  const context = useContext(AppContext);
  const usersData = context.users.users;
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{flex: 1, paddingHorizontal: theme.spacing.small}}>
      {usersData
        .filter(item => item.chatId)
        .map(item => {
          const {chatId, ...user} = item;
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ChatScreen', {
                  user,
                  chatId,
                });
              }}
              style={{flexDirection: 'row', marginBottom: theme.spacing.small}}>
              <Image
                source={{uri: user.avatar}}
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: theme.spacing.large,
                  marginRight: theme.spacing.small,
                }}
              />
              <Text style={{fontSize: theme.fontSizes.large}}>{user.name}</Text>
              <Text style={{fontSize: theme.fontSizes.large}}>
                {' - '}
                id {chatId}
              </Text>
            </TouchableOpacity>
          );
        })}
    </SafeAreaView>
  );
}
