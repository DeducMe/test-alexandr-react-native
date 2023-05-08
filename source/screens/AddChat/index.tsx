import React, {useState, useCallback, useEffect, useContext} from 'react';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppContext} from '../../providers/AppProvider';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import useTheme from '../../hooks/useTheme';
import IconComponent from '../../components/IconComponent/IconComponent';
import {TextInput} from 'react-native';
import {IUserData} from '../../hooks/useUsers';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/DefaultStackNavigator';
import Avatar from '../../components/Avatar';

export function AddChat() {
  const context = useContext(AppContext);
  const theme = useTheme();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const messages = context.messages.messages;
  const users = context.users.users;
  const addChatWithUser = context.chats.addChatWithUser;

  const [usersWithoutPersonalChats, setUsersWithoutPersonalChats] = useState<
    IUserData[]
  >([]);
  const [usersAvailable, setUsersAvailable] = useState<IUserData[]>([]);

  useEffect(() => {
    // basically this script checkes if user already have a personal chat with other users

    let personalChatCreatedWithUserId: number[] = [];
    let availableUsers: IUserData[] = [];

    context.chats.chats
      .filter(chat => chat.type === 'PERSONAL')
      .forEach(chat => {
        personalChatCreatedWithUserId.push(chat.users[0]);
      });

    availableUsers = users.filter(
      user => !personalChatCreatedWithUserId.includes(user._id),
    );

    setUsersWithoutPersonalChats(availableUsers);
    setUsersAvailable(availableUsers);
  }, []);

  function onChangeText(value: string) {
    const usersAvailableFiltered = usersWithoutPersonalChats.filter(item =>
      item.name.includes(value),
    );
    setUsersAvailable(usersAvailableFiltered);
  }

  return (
    <SafeAreaView style={{flex: 1, marginHorizontal: theme.space.s}}>
      <TextInput
        placeholder="Search user"
        style={{
          padding: theme.space.s,
          borderWidth: 1,
          borderRadius: theme.space.s,
          marginBottom: theme.space.s,
        }}
        onChangeText={onChangeText}></TextInput>
      {usersAvailable.map(user => {
        return (
          <TouchableOpacity
            onPress={() => {
              const chatId = new Date().getTime();
              addChatWithUser(user._id, chatId, `${user.name}`, user.avatar);
              navigation.goBack();
              navigation.navigate('ChatScreen', {
                users: [user._id],
                chatId,
                chatData: {
                  name: `${user.name}`,
                  avatar: user.avatar,
                  type: 'PERSONAL',
                },
              });
            }}
            style={{
              flexDirection: 'row',
              marginBottom: theme.space.s,
            }}>
            <Avatar
              avatar={user.avatar}
              onPress={() => {
                navigation.navigate('UserScreen', {
                  user,
                });
              }}></Avatar>
            <Text style={{fontSize: theme.fontSizes.large}}>{user.name}</Text>
          </TouchableOpacity>
        );
      })}
    </SafeAreaView>
  );
}
