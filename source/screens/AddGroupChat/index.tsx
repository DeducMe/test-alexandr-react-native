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
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {RoundButton} from '../../components/RoundButton';

export function AddGroupChat() {
  const context = useContext(AppContext);
  const theme = useTheme();
  const navigation = useNavigation();

  const messages = context.messages.messages;
  const users = context.users.users;
  const addGroupChatWithUsers = context.chats.addGroupChatWithUsers;

  const [usersAvailable, setUsersAvailable] = useState<IUserData[]>([]);
  const [usersChecked, setUsersChecked] = useState<number[]>([]);
  const [groupName, setGroupName] = useState('');

  useEffect(() => {
    setUsersAvailable(users);
  }, [usersChecked.length]);

  function onChangeText(value: string) {
    const usersAvailableFiltered = users.filter(item =>
      item.name.includes(value),
    );
    setUsersAvailable(usersAvailableFiltered);
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginHorizontal: theme.space.s,
        justifyContent: 'space-between',
      }}>
      <View>
        <TextInput
          placeholder="Group name"
          style={{
            padding: theme.space.s,
            borderWidth: 1,
            borderRadius: theme.space.xxs,
            marginBottom: theme.space.s,
          }}
          onChangeText={setGroupName}></TextInput>
        <TextInput
          placeholder="Search user"
          style={{
            padding: theme.space.s,
            borderWidth: 1,
            borderRadius: theme.space.xxs,
            marginBottom: theme.space.s,
          }}
          onChangeText={onChangeText}></TextInput>
        {usersAvailable.map((user, index) => {
          return (
            <TouchableOpacity
              key={`${index}`}
              onPress={() => {
                // const chatId = new Date().getTime();
                // addChatWithUser(user._id, chatId);

                if (usersChecked.includes(user._id))
                  return setUsersChecked(
                    usersChecked.filter(item => item !== user._id),
                  );

                return setUsersChecked([...usersChecked, user._id]);
              }}
              style={{
                flexDirection: 'row',
                marginBottom: theme.space.s,
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={{uri: user.avatar}}
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: theme.space.l,
                    marginRight: theme.space.s,
                  }}
                />
                <Text style={{fontSize: theme.fontSizes.large}}>
                  {user.name}
                </Text>
              </View>
              <BouncyCheckbox
                disabled
                disableBuiltInState
                isChecked={usersChecked.includes(user._id)}
              />
            </TouchableOpacity>
          );
        })}
      </View>
      <RoundButton
        disabled={usersChecked?.length < 2 || !groupName}
        style={{
          marginBottom: theme.space.m,
          backgroundColor:
            usersChecked?.length < 2 || !groupName
              ? theme.colors.GREY
              : theme.colors.PRIMARY,
          paddingVertical: theme.space.xxs,
        }}
        title="Create group chat"
        onPress={() => {
          const chatId = new Date().getTime();
          addGroupChatWithUsers(
            usersChecked,
            chatId,
            groupName,
            'https://placeimg.com/140/140/any',
          );
          navigation.goBack();
          navigation.navigate('ChatScreen', {
            users: usersChecked,
            chatId,
            chatData: {
              name: groupName,
              avatar: 'https://placeimg.com/140/140/any',
            },
          });
        }}
      />
    </SafeAreaView>
  );
}
