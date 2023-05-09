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
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/DefaultStackNavigator';
import Avatar from '../../components/Avatar';
import {makeStyleSheet} from '../../theme/makeStyleSheet';
import {Platform} from 'react-native';

export function AddGroupChat() {
  const context = useContext(AppContext);
  const theme = useTheme();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const styles = makeStyle();

  const {users} = context.users;
  const {addGroupChatWithUsers} = context.chats;

  const [usersAvailable, setUsersAvailable] = useState<IUserData[]>([]);
  const [usersChecked, setUsersChecked] = useState<number[]>([]);
  const [groupName, setGroupName] = useState('');

  useEffect(() => {
    setUsersAvailable(users);
  }, [usersChecked.length]);

  const onChangeText = (value: string) => {
    const usersAvailableFiltered = users.filter(item =>
      item.name.includes(value),
    );
    setUsersAvailable(usersAvailableFiltered);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.input}>
          <TextInput
            placeholder="Group name"
            onChangeText={text => setGroupName(text)}></TextInput>
          <IconComponent
            size={theme.iconSize.m}
            iconSet="Ionicons"
            name="chatbubbles-outline"></IconComponent>
        </View>
        <View style={styles.input}>
          <TextInput
            placeholder="Search user"
            onChangeText={onChangeText}></TextInput>
          <IconComponent
            size={theme.iconSize.m}
            iconSet="Feather"
            name="search"></IconComponent>
        </View>

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
                justifyContent: 'space-between',
                padding: theme.space.s,

                backgroundColor: theme.colors.DEFAULT_LIGHT,
                flexDirection: 'row',
                marginBottom: theme.space.s,
                borderRadius: theme.space.xxs,
              }}>
              <View style={{flexDirection: 'row'}}>
                <Avatar
                  avatar={user.avatar}
                  onPress={() => {
                    navigation.navigate('UserScreen', {
                      user,
                    });
                  }}></Avatar>

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
        textColor={theme.colors.DEFAULT_LIGHT}
        title="Create group chat"
        onPress={() => {
          const chatId = new Date().getTime();
          addGroupChatWithUsers(
            usersChecked,
            chatId,
            groupName,
            'https://picsum.photos/140',
          );
          navigation.goBack();
          navigation.navigate('ChatScreen', {
            users: usersChecked,
            chatId,
            chatData: {
              name: groupName,
              avatar: 'https://picsum.photos/140',
              type: 'GROUP',
            },
          });
        }}
      />
    </SafeAreaView>
  );
}

const makeStyle = makeStyleSheet(theme => ({
  input: {
    paddingHorizontal: theme.space.s,
    paddingVertical:
      Platform.OS === 'android' ? theme.space.xxs : theme.space.s,
    backgroundColor: theme.colors.DEFAULT_LIGHT,
    borderRadius: theme.space.xxs,
    marginBottom: theme.space.s,

    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    paddingHorizontal: theme.space.s,
    justifyContent: 'space-between',
    backgroundColor: theme.colors.DEFAULT,
  },
}));
