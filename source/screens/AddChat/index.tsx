import React, {useState, useCallback, useEffect, useContext} from 'react';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';
import {Image, Platform, Text, TouchableOpacity, View} from 'react-native';
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

  const {users} = context.users;
  const {addChatWithUser, chats} = context.chats;

  const [usersWithoutPersonalChats, setUsersWithoutPersonalChats] = useState<
    IUserData[]
  >([]);
  const [usersAvailable, setUsersAvailable] = useState<IUserData[]>([]);

  useEffect(() => {
    // basically this script checkes if user already have a personal chat with other users

    let personalChatCreatedWithUserId: number[] = [];
    let availableUsers: IUserData[] = [];

    chats
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

  const onChangeText = (value: string) => {
    const usersAvailableFiltered = usersWithoutPersonalChats.filter(item =>
      item.name.includes(value),
    );
    setUsersAvailable(usersAvailableFiltered);
  };

  return (
    <SafeAreaView style={{flex: 1, paddingHorizontal: theme.space.s}}>
      <View
        style={{
          paddingHorizontal: theme.space.s,
          paddingVertical:
            Platform.OS === 'android' ? theme.space.xxs : theme.space.s,
          flexDirection: 'row',
          justifyContent: 'space-between',

          backgroundColor: theme.colors.DEFAULT_LIGHT,
          borderRadius: theme.space.xxs,
          marginBottom: theme.space.s,
        }}>
        <TextInput
          placeholder="Search user"
          onChangeText={onChangeText}></TextInput>
        <IconComponent
          size={theme.iconSize.m}
          iconSet="Feather"
          name="search"></IconComponent>
      </View>
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
